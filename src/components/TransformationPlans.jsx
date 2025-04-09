import React, { useState } from 'react';
import { FiPlus, FiSearch, FiFilter, FiDownload, FiUpload, FiSend, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';
import { useAuth } from '../auth/AuthContext';
import useStore from '../store/store';
import { generateRfpId, generateTransformMarkdown } from '../utils/exportTransform';
import { downloadMarkdown } from '../utils/downloadMarkdown';

const TransformationPlans = () => {
  const { currentUser } = useAuth();
  const transformItems = useStore((state) => state.transformItems[currentUser?.clientId] || []);
  const { addAdminRfp, setActiveSection } = useStore();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showError, setShowError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedRequirements, setSelectedRequirements] = useState(new Set());
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCreateRfp = async () => {
    try {
      if (selectedRequirements.size === 0) {
        setErrorMessage('Please select at least one requirement');
        setShowError(true);
        console.log("error")
        return;
      }
      console.log("iam here")

      const selectedItems = transformItems.filter(item => selectedRequirements.has(item.id));
      const rfpId = generateRfpId(currentUser.companyName, 'Transform');
      const content = generateTransformMarkdown(selectedItems, [], {
        clientName: currentUser.companyName,
        name: 'Transform Requirements',
        type: 'Transform',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        scope: 'Transform requirements implementation',
        objectives: 'Implement selected transformation requirements',
        deliverables: 'Completed transformation deliverables'
      });
      
      const newRfp = {
        id: Date.now(),
        rfpId,
        title: `Transform Requirements - ${currentUser.companyName}`,
        clientName: currentUser.companyName,
        clientId: currentUser.clientId,
        requirements: selectedItems,
        content,
        status: 'new',
        createdAt: new Date().toISOString(),
        submittedBy: currentUser.id,
        submitterRole: currentUser.role,
        projectType: 'Transform',
        visibleToAdmin: true
      };
      console.log(newRfp)
      const result = await addAdminRfp(newRfp);
      console.log(result)
      if (!result) {
        throw new Error('Failed to create RFP');
      }
      
      setShowSuccess(true);
      setSelectedRequirements(new Set());
      
      setTimeout(() => {
        setShowSuccess(false);
        setActiveSection('client-rfp');
      }, 1500);
      
    } catch (error) {
      console.error('Error creating RFP:', error);
      setErrorMessage('Failed to create RFP. Please try again.');
      setShowError(true);
    }
  };

  const toggleRequirement = (itemId) => {
    setSelectedRequirements(prev => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  };

  // Filter transform items
  const filteredItems = transformItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.area.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || item.priority === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const handleExport = (item) => {
    const content = `# Transform Requirement: ${item.title}

## Details
- ID: ${item.requirementId}
- Area: ${item.area}
- Priority: ${item.priority}
- Created: ${new Date(item.createdAt).toLocaleString()}

## Impact
${item.impact}

## Recommendation
${item.recommendation}
`;
    downloadMarkdown(content, `transform-requirement-${item.requirementId.toLowerCase()}.md`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Transform Requirements</h2>
            <p className="text-gray-600">
              {selectedRequirements.size > 0 
                ? `${selectedRequirements.size} requirement${selectedRequirements.size > 1 ? 's' : ''} selected`
                : 'Select requirements to create RFP'}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCreateRfp}
              disabled={selectedRequirements.size === 0}
              className={`btn flex items-center ${
                selectedRequirements.size > 0 
                  ? 'btn-primary animate-pulse-slow' 
                  : 'btn-secondary opacity-50'
              }`}
              title={selectedRequirements.size === 0 ? 'Select requirements first' : 'Create RFP from selected requirements'}
            >
              <FiSend className="mr-2" />
              Create RFP {selectedRequirements.size > 0 ? `(${selectedRequirements.size})` : ''}
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn btn-primary flex items-center"
            >
              <FiPlus className="mr-2" /> Add Requirement
            </button>
          </div>
        </div>
        
        {showError && (
          <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg flex items-center">
            <FiAlertTriangle className="mr-2" /> {errorMessage}
          </div>
        )}
        
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="input-field pl-10"
                placeholder="Search requirements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <select
              className="input-field max-w-xs"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>
        </div>

        {filteredItems.length > 0 ? (
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <div 
                key={item.id} 
                className={`bg-gray-50 p-4 rounded-lg ${
                  selectedRequirements.has(item.id) ? 'border-2 border-primary-500' : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedRequirements.has(item.id)}
                        onChange={() => toggleRequirement(item.id)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm font-mono text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                        {item.requirementId}
                      </span>
                      <h4 className="font-medium text-gray-900">{item.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Area: {item.area}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.priority === 'high' ? 'bg-red-100 text-red-800' :
                    item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)} Priority
                  </span>
                </div>
                <div className="mt-4 space-y-2">
                  <div>
                    <h5 className="text-xs font-medium text-gray-700 uppercase">Impact</h5>
                    <p className="text-sm text-gray-600">{item.impact}</p>
                  </div>
                  <div>
                    <h5 className="text-xs font-medium text-gray-700 uppercase">Recommendation</h5>
                    <p className="text-sm text-gray-600">{item.recommendation}</p>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    Created {new Date(item.createdAt).toLocaleString('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </span>
                  <div className="flex space-x-2">
                    <button className="btn btn-secondary text-sm">
                      <FiDownload className="mr-1" onClick={() => handleExport(item)} /> Export
                    </button>
                    <button 
                      className="btn btn-primary text-sm"
                      onClick={() => setSelectedItem(item)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiUpload className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Transform Requirements</h3>
            <p className="text-gray-500 mb-4">Start by adding your first transformation requirement</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn btn-primary"
            >
              <FiPlus className="mr-2" /> Add Requirement
            </button>
          </div>
        )}
      </div>
      
      {/* Details Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedItem.title}</h3>
                <p className="text-sm font-mono text-primary-600 bg-primary-50 px-2 py-0.5 rounded mt-2 inline-block">
                  {selectedItem.requirementId}
                </p>
              </div>
              <button 
                onClick={() => setSelectedItem(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Area</h4>
                  <p className="text-gray-900">{selectedItem.area}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Priority</h4>
                  <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${
                    selectedItem.priority === 'high' ? 'bg-red-100 text-red-800' :
                    selectedItem.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {selectedItem.priority.charAt(0).toUpperCase() + selectedItem.priority.slice(1)} Priority
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Impact</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-800 whitespace-pre-wrap">{selectedItem.impact}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Recommendation</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-800 whitespace-pre-wrap">{selectedItem.recommendation}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Created {new Date(selectedItem.createdAt).toLocaleString()}
                  </span>
                  <button
                    onClick={() => handleExport(selectedItem)}
                    className="btn btn-secondary text-sm"
                  >
                    <FiDownload className="mr-2" /> Export Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {showSuccess && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg flex items-center">
          <FiCheckCircle className="mr-2" /> RFP created successfully! Redirecting to RFP view...
        </div>
      )}
    </div>
  );
};

export default TransformationPlans;