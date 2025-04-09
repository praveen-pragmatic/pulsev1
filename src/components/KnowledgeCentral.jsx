import React, { useState } from 'react';
import { FiFolder, FiBook, FiFileText, FiSearch, FiUpload, FiDownload, FiPlus } from 'react-icons/fi';

const knowledgeFolders = [
  {
    name: 'Chei AI',
    icon: <FiFolder className="text-cyan-500" />,
    poweredBy: 'by 10Decoders',
    documents: [
      'HIPAA Compliance Framework',
      'Clinical Data Management',
      'Research Protocol Automation',
      'Regulatory Documentation',
      'Patient Data Security'
    ]
  },
  {
    name: 'Alt.Data (Powered by Thurro)',
    icon: <FiFolder className="text-purple-500" />,
    categories: {
      'Auto': {
        preview: ['Registrations by Segment', 'OEM Wise Registration', 'Fuel Mix Registrations', 'Geographical Distribution', 'Inventory'],
        all: ['Registrations by Segment', 'OEM Wise Registration', 'Fuel Mix Registrations', 'Geographical Distribution', 'Inventory', 'Prices']
      },
      'Banks': {
        preview: ['RTGS Flows', 'Credit Card Spends', 'POS Terminals', 'UPI Payments', 'Branch Network'],
        all: ['RTGS Flows', 'Credit Card Spends', 'POS Terminals', 'UPI Payments', 'Branch Network', 'Cards In Circulation']
      },
      'Insurance': {
        preview: ['Life New Business Rev', 'Life No Of Policies', 'Segment Mix', 'No Of Agents', 'Industry Concentration'],
        all: ['Life New Business Rev', 'Life No Of Policies', 'Segment Mix', 'No Of Agents', 'Industry Concentration', 'Premium Per Agent']
      },
      'Mutual Funds': {
        preview: ['Monthly Flows', 'AUM By Company', 'Growth In Folios', 'Sector Wise Holdings', 'Investors By AUM'],
        all: ['Monthly Flows', 'AUM By Company', 'Growth In Folios', 'Sector Wise Holdings', 'Investors By AUM', 'Market Concentration']
      },
      'Power': {
        preview: ['Daily Power Generated', 'Segment Wise Generation', 'Payment Overdues', 'Plant Wise Generation', 'Coal Availability'],
        all: ['Daily Power Generated', 'Segment Wise Generation', 'Payment Overdues', 'Plant Wise Generation', 'Coal Availability', 'PLF Of Power Plants']
      },
      'Commodities': {
        preview: ['End Of Month Prices', 'International Prices', 'Rail Despatches', 'Monthly Production', 'Growth In Production'],
        all: ['End Of Month Prices', 'International Prices', 'Rail Despatches', 'Monthly Production', 'Growth In Production', 'Market Share']
      },
      'EXIM': {
        preview: ['Total Imports', 'Total Exports', 'Imports By Country', 'Exports By Country', 'Commodity Wise Imports'],
        all: ['Total Imports', 'Total Exports', 'Imports By Country', 'Exports By Country', 'Commodity Wise Imports', 'Commodity Wise Exports']
      },
      'Economy': {
        preview: ['GST Collections', 'Customs Revenue', 'Employment Indicators', 'Inflation - CPI & WPI', 'CAPEX Indicators'],
        all: ['GST Collections', 'Customs Revenue', 'Employment Indicators', 'Inflation - CPI & WPI', 'CAPEX Indicators', 'New Co. Registrations']
      },
      'FMCG': {
        preview: ['Selling Brands', 'Trending Themes', 'Pack Size', 'Prices', 'Top Selling Products'],
        all: ['Selling Brands', 'Trending Themes', 'Pack Size', 'Prices', 'Top Selling Products', 'Affinity Share']
      }
    }
  },
  {
    name: 'Sales',
    icon: <FiFolder className="text-emerald-500" />,
    documents: ['Sales Strategy', 'Pipeline Management', 'Client Acquisition', 'Sales Analytics', 'Territory Planning']
  },
  {
    name: 'Marketing',
    icon: <FiFolder className="text-pink-500" />,
    documents: ['Marketing Strategy', 'Campaign Management', 'Digital Marketing', 'Brand Guidelines', 'Market Analysis']
  },
  {
    name: 'Operations',
    icon: <FiFolder className="text-amber-500" />,
    documents: ['Process Optimization', 'Quality Management', 'Resource Planning', 'Service Delivery', 'Operational Excellence']
  },
  {
    name: 'KPIs & Analytics',
    icon: <FiFolder className="text-sky-500" />,
    documents: ['Performance Metrics', 'Business Intelligence', 'Reporting Templates', 'Analytics Frameworks', 'Dashboard Design']
  },
  {
    name: 'Capital Markets',
    icon: <FiFolder className="text-blue-500" />,
    documents: ['Trading Systems', 'Market Infrastructure', 'Risk Management']
  },
  {
    name: 'Wealth Management',
    icon: <FiFolder className="text-green-500" />,
    documents: ['Portfolio Management', 'Client Advisory', 'Investment Products']
  },
  {
    name: 'NBFC',
    icon: <FiFolder className="text-purple-500" />,
    documents: ['Lending Operations', 'Risk Assessment', 'Regulatory Compliance']
  },
  {
    name: 'Insurance',
    icon: <FiFolder className="text-red-500" />,
    documents: ['Claims Processing', 'Underwriting', 'Policy Management']
  },
  {
    name: 'Banking',
    icon: <FiFolder className="text-yellow-500" />,
    documents: ['Core Banking', 'Digital Banking', 'Treasury Operations']
  },
  {
    name: 'Payments',
    icon: <FiFolder className="text-indigo-500" />,
    documents: ['Payment Systems', 'Settlement', 'Digital Wallets']
  },
  {
    name: 'Financial Services',
    icon: <FiFolder className="text-cyan-500" />,
    documents: ['KYC/AML', 'Regulatory Framework', 'Risk Management']
  },
  {
    name: 'Lending',
    icon: <FiFolder className="text-orange-500" />,
    documents: ['Credit Assessment', 'Loan Processing', 'Collections']
  },
  {
    name: 'Alternate Finance',
    icon: <FiFolder className="text-emerald-500" />,
    documents: ['P2P Lending', 'Crowdfunding', 'Digital Assets']
  }
];

const KnowledgeCentral = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDocument, setSelectedDocument] = useState('');
  const [expandedCategories, setExpandedCategories] = useState({});
  const [selectedAltData, setSelectedAltData] = useState(null);

  const filteredFolders = knowledgeFolders.filter(folder =>
    folder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (folder.documents ? 
      folder.documents.some(doc => doc.toLowerCase().includes(searchQuery.toLowerCase())) :
      Object.values(folder.categories || {}).some(cat => 
        cat.all.some(doc => doc.toLowerCase().includes(searchQuery.toLowerCase()))
      ))
  );

  const toggleCategory = (category) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleFolderClick = (folder) => {
    setSelectedCategory(folder.name);
    setSelectedDocument('');
    setShowUploadForm(true);
  };

  const handleDocumentClick = (folder, doc) => {
    setSelectedCategory(folder.name);
    setSelectedDocument(doc);
    setShowUploadForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <FiBook className="h-6 w-6 text-primary-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Pragmatic Knowledge Central</h2>
          </div>
          <div className="flex space-x-4">
            <div className="relative">
              <input
                type="text"
                className="input-field pl-10"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button 
              onClick={() => setShowUploadForm(true)}
              className="btn btn-primary flex items-center"
            >
              <FiUpload className="mr-2" /> Upload Document
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFolders.map((folder) => (
            <div 
              key={folder.name} 
              className="border rounded-lg p-4 hover:border-primary-300 transition-colors cursor-pointer"
              onClick={() => handleFolderClick(folder)}
            >
              <div className="flex items-center mb-4">
                {folder.icon}
                <h3 className="text-lg font-medium text-gray-900 ml-2">{folder.name}</h3>
                {folder.poweredBy && (
                  <span className="ml-2 text-xs bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded-full whitespace-nowrap">
                    {folder.poweredBy}
                  </span>
                )}
                {folder.categories && (
                  <span className="ml-2 text-sm text-gray-500">
                    ({Object.keys(folder.categories).length} categories)
                  </span>
                )}
              </div>
              
              {folder.documents ? (
                <ul className="space-y-2">
                  {folder.documents.map((doc) => (
                    <li key={doc} className="flex items-center text-sm text-gray-600 hover:text-primary-600">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDocumentClick(folder, doc);
                        }}
                        className="flex items-center w-full hover:text-primary-600"
                      >
                        <FiFileText className="h-4 w-4 mr-2" />
                        {doc}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedAltData(folder);
                    setShowUploadForm(true);
                  }}
                  className="w-full text-left text-sm text-primary-600 hover:text-primary-800"
                >
                  View all categories →
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Access</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="btn btn-secondary text-sm">Best Practices</button>
            <button className="btn btn-secondary text-sm">Governance</button>
            <button className="btn btn-secondary text-sm">Project Templates</button>
            <button className="btn btn-secondary text-sm">Policies</button>
          </div>
        </div>
      </div>

      {/* Category Upload Form */}
      {showUploadForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            {selectedAltData ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900">{selectedAltData.name}</h3>
                  <button onClick={() => {
                    setShowUploadForm(false);
                    setSelectedAltData(null);
                  }} className="text-gray-400 hover:text-gray-500">×</button>
                </div>
                <div className="space-y-4 max-h-[70vh] overflow-y-auto">
                  {Object.entries(selectedAltData.categories).map(([category, { all }]) => (
                    <div key={category} className="border rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3">{category}</h4>
                      <ul className="space-y-2">
                        {all.map((item) => (
                          <li key={item} className="flex items-center text-sm text-gray-600">
                            <FiFileText className="h-4 w-4 mr-2 text-gray-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Upload {selectedCategory} {selectedDocument ? `- ${selectedDocument}` : ''} Document
                  </h3>
                  <button onClick={() => setShowUploadForm(false)} className="text-gray-400 hover:text-gray-500">×</button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Document Title</label>
                    <input 
                      type="text" 
                      className="input-field mt-1" 
                      placeholder="Enter document title"
                      value={selectedDocument}
                      onChange={(e) => setSelectedDocument(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <input
                      type="text"
                      className="input-field mt-1"
                      value={selectedCategory}
                      disabled
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Document Type</label>
                    <select className="input-field mt-1">
                      <option value="best-practice">Best Practice</option>
                      <option value="policy">Policy</option>
                      <option value="template">Template</option>
                      <option value="guide">Guide</option>
                      <option value="framework">Framework</option>
                      <option value="metrics">Metrics & KPIs</option>
                      <option value="process">Process Documentation</option>
                      <option value="strategy">Strategy Document</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">File</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <div className="flex items-center justify-center">
                          <FiUpload className="h-12 w-12 text-gray-400" />
                          <div className="ml-3 text-left">
                            <p className="text-sm font-medium text-gray-900">{selectedCategory}</p>
                            <p className="text-xs text-gray-500">
                              Upload documents for {selectedCategory}
                              {selectedDocument && ` - ${selectedDocument}`}
                            </p>
                          </div>
                        </div>
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500">
                            <span>Upload a file</span>
                            <input type="file" className="sr-only" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PDF, Word, Excel up to 10MB</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end space-x-3">
                    <button onClick={() => setShowUploadForm(false)} className="btn btn-secondary">
                      Cancel
                    </button>
                    <button className="btn btn-primary">
                      Upload to {selectedCategory}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgeCentral;