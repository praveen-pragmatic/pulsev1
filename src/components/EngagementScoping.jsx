import React, { useState, useEffect } from 'react';
import { FiSave, FiX, FiCheck, FiPlay, FiUpload } from 'react-icons/fi';
import DiagnosticAnalysis from './DiagnosticAnalysis.jsx';
import useStore from '../store/store';
import { useAuth } from '../auth/AuthContext';
import AutoGenerateInput from './AutoGenerateInput';
import { generateSuggestions } from '../utils/suggestions';
import EnhanceWithAI from './EnhanceWithAI';

const STORAGE_KEY = 'engagement_submissions';
import { mockUsers } from '../auth/mockUsers';

const EngagementScoping = ({ setActiveSection }) => {
  const { currentUser } = useAuth();
  const addUploadedFile = useStore((state) => state.addUploadedFile);
  const [formData, setFormData] = useState({
    selectedClient: currentUser.clientId || '',
    projectName: '',
    clientName: currentUser.companyName || '',
    engagementTypes: [],
    departments: [],
    projectTitle: '',
    projectObjectives: '',
    problemStatement: '',
    affectedAreas: [],
    customEngagement: '',
    scopeDescription: '',
    keyDeliverables: '',
    startDate: '',
    endDate: '',
    milestones: '',
    additionalNotes: ''
  });
  
  // Filter Freemium clients from mockUsers
  const freemiumClients = [
    ...mockUsers
      .filter(user => user.role === 'client' && user.metrics?.tier === 'Freemium')
      .map(user => ({
        id: user.clientId,
        name: user.companyName
      }))
  ];

  const [submissions, setSubmissions] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [showDiagnostic, setShowDiagnostic] = useState(false);
  
  const handleClearSubmissions = () => {
    if (window.confirm('Are you sure you want to clear all submissions? This action cannot be undone.')) {
      localStorage.removeItem(STORAGE_KEY);
      setSubmissions([]);
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      addUploadedFile(file);
    });
  };

  const handleStartDiagnostic = (submission) => {
    // Store submission in localStorage for diagnostic page
    localStorage.setItem('current_diagnostic', JSON.stringify(submission));
    // Navigate to diagnostic page
    setActiveSection('diagnostic');
  };

  useEffect(() => {
    const savedSubmissions = localStorage.getItem(STORAGE_KEY);
    if (savedSubmissions) {
      const allSubmissions = JSON.parse(savedSubmissions);
      
      // Filter submissions based on user role and ID
      const filteredSubmissions = allSubmissions.filter(submission => {
        if (currentUser.role === 'client') {
          // Clients only see their own submissions
          return submission.data.clientName === currentUser.companyName;
        } else if (currentUser.role === 'junior_consultant' || currentUser.role === 'senior_consultant') {
          // Consultants only see submissions for their assigned clients
          return currentUser.assignedClients.includes(submission.data.selectedClient);
        }
        // Admin sees all submissions
        return currentUser.role === 'admin';
      });
      
      setSubmissions(filteredSubmissions);
    }
  }, []);

  const [showDepartments, setShowDepartments] = useState(false);
  const [showProject, setShowProject] = useState(false);
  const [showProblem, setShowProblem] = useState(false);
  const [showCustom, setShowCustom] = useState(false);

  const engagementTypes = [
    'By Department',
    'By Project',
    'By Problem Statement',
    'Revenue Optimization',
    'Growth Strategy',
    'Cost Reduction',
    'Other'
  ];

  const departmentOptions = [
    // Core Banking & Financial Services
    'Retail Banking',
    'Corporate Banking',
    'Investment Banking',
    'Wealth Management',
    'Asset Management',
    'Treasury',
    'Risk Management',
    'Compliance & Regulatory',
    'Capital Markets',
    'Fixed Income',
    'Equity Markets',
    'Derivatives Trading',
    'Structured Products',
    
    // Operations & Support
    'Trade Operations',
    'Settlement Operations',
    'Back Office Operations',
    'Middle Office',
    'Client Operations',
    'Fund Administration',
    'Custody Services',
    'Clearing Services',
    'Reconciliation',
    'Corporate Actions',
    
    // Technology & Infrastructure
    'IT Infrastructure',
    'Digital Banking',
    'Cybersecurity',
    'Data Analytics',
    'Core Banking Systems',
    'Trading Systems',
    'Payment Systems',
    'Enterprise Architecture',
    'Cloud Infrastructure',
    
    // Control & Oversight
    'Internal Audit',
    'Financial Control',
    'Credit Control',
    'Fraud Prevention',
    'Operational Risk',
    'Market Risk',
    'Credit Risk',
    'Model Risk',
    'Regulatory Reporting',
    
    // Client-Facing Functions
    'Client Relations',
    'Private Banking',
    'Advisory Services',
    'Portfolio Management',
    'Relationship Management',
    'Sales & Trading',
    'Research',
    'Product Development',
    'Client Onboarding',
    
    // Support Functions
    'Human Resources',
    'Legal & Compliance',
    'Marketing & Communications',
    'Research & Analytics',
    'Strategy & Planning',
    'Finance & Treasury',
    'Facilities Management',
    'Procurement',
    'Business Continuity',
    
    // Specialized Services
    'Islamic Banking',
    'Project Finance',
    'Merger & Acquisitions',
    'Syndication',
    'Global Markets',
    
    // Innovation & Digital
    'Digital Innovation',
    'Fintech Integration',
    'Blockchain Solutions',
    'AI & Machine Learning',
    'Open Banking',
    
    // Governance
    'Board Secretariat',
    'Corporate Governance',
    'Shareholder Relations',
    'Sustainability',
    'ESG Compliance'
  ];

  const handleEngagementTypeChange = (type) => {
    let updatedTypes;
    if (type === 'All of the Above') {
      updatedTypes = formData.engagementTypes.length === engagementTypes.length ? [] : [...engagementTypes];
    } else {
      updatedTypes = formData.engagementTypes.includes(type)
        ? formData.engagementTypes.filter(t => t !== type)
        : [...formData.engagementTypes, type];
    }
    
    setFormData(prev => ({
      ...prev,
      engagementTypes: updatedTypes
    }));

    // Show/hide conditional sections
    setShowDepartments(updatedTypes.includes('By Department'));
    setShowProject(updatedTypes.includes('By Project'));
    setShowProblem(updatedTypes.includes('By Problem Statement'));
    setShowCustom(updatedTypes.includes('Other'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Store submission
    const submission = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      data: {
        ...formData,
        selectedClient: formData.selectedClient || currentUser.clientId
      },
      submittedBy: currentUser.id,
      submitterRole: currentUser.role
    };
    
    const updatedSubmissions = [...submissions, submission];
    setSubmissions(updatedSubmissions);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSubmissions));
    
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      // Navigate to data ingestion after submission
      setActiveSection('data-ingestion');
    }, 2000);
    
    // Reset form
    setFormData({
      projectName: '',
      clientName: '',
      engagementTypes: [],
      departments: [],
      projectTitle: '',
      projectObjectives: '',
      problemStatement: '',
      affectedAreas: [],
      customEngagement: '',
      scopeDescription: '',
      keyDeliverables: '',
      startDate: '',
      endDate: '',
      milestones: '',
      additionalNotes: ''
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Engagement & Scoping Form</h2>
        
        {currentUser.role !== 'client' && (
          <div className="mb-6">
            <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-1">
              Select Freemium Client
            </label>
            <select 
              id="client"
              className="input-field"
              value={formData.selectedClient}
              onChange={(e) => {
                const selectedClient = freemiumClients.find(c => c.id === e.target.value);
                setFormData(prev => ({
                  ...prev,
                  selectedClient: e.target.value,
                  clientName: selectedClient ? selectedClient.name : ''
                }));
              }}
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
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Project/Engagement Name</label>
              <AutoGenerateInput
                value={formData.projectName}
                onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
                generateSuggestions={generateSuggestions.projectName}
                placeholder="Enter project name"
                required
              />
            </div>
            <div>
              <label className="form-label">Client Name</label>
              <AutoGenerateInput
                value={currentUser.role === 'client' ? currentUser.companyName : formData.clientName}
                onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                generateSuggestions={generateSuggestions.clientName}
                placeholder="Enter client name"
                required
                readOnly={formData.selectedClient !== '' || currentUser.role === 'client'}
              />
            </div>
          </div>

          {/* Engagement Types */}
          <div>
            <label className="form-label">Engagement Type</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {engagementTypes.map((type) => (
                <label key={type} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-primary-600 mr-2"
                    checked={formData.engagementTypes.includes(type)}
                    onChange={() => handleEngagementTypeChange(type)}
                  />
                  <span className="text-sm">{type}</span>
                </label>
              ))}
              <label className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-primary-600 mr-2"
                  checked={formData.engagementTypes.length === engagementTypes.length}
                  onChange={() => handleEngagementTypeChange('All of the Above')}
                />
                <span className="text-sm font-medium">All of the Above</span>
              </label>
            </div>
          </div>

          {/* Conditional Sections */}
          {showDepartments && (
            <div>
              <label className="form-label">Select Departments</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {departmentOptions.map((dept) => (
                  <label key={dept} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary-600 mr-2"
                      checked={formData.departments.includes(dept)}
                      onChange={() => {
                        const updatedDepts = formData.departments.includes(dept)
                          ? formData.departments.filter(d => d !== dept)
                          : [...formData.departments, dept];
                        setFormData(prev => ({ ...prev, departments: updatedDepts }));
                      }}
                    />
                    <span className="text-sm">{dept}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {showProject && (
            <div className="space-y-4">
              <div>
                <label className="form-label">Project Title/Code</label>
                <AutoGenerateInput
                  value={formData.projectTitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, projectTitle: e.target.value }))}
                  generateSuggestions={generateSuggestions.projectTitle}
                  placeholder="Enter project title"
                />
              </div>
              <div>
                <label className="form-label">Project Objectives</label>
                <EnhanceWithAI
                  value={formData.projectObjectives}
                  onChange={(e) => setFormData(prev => ({ ...prev, projectObjectives: e.target.value }))}
                  placeholder="Enter project objectives..."
                />
              </div>
            </div>
          )}

          {showProblem && (
            <div className="space-y-4">
              <div>
                <label className="form-label">Problem Statement</label>
                <EnhanceWithAI
                  value={formData.problemStatement}
                  onChange={(e) => setFormData(prev => ({ ...prev, problemStatement: e.target.value }))}
                  placeholder="Describe the problem to be solved..."
                />
              </div>
              <div>
                <label className="form-label">Affected Areas/Departments</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {departmentOptions.map((dept) => (
                    <label key={dept} className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-primary-600 mr-2"
                        checked={formData.affectedAreas.includes(dept)}
                        onChange={() => {
                          const updatedAreas = formData.affectedAreas.includes(dept)
                            ? formData.affectedAreas.filter(a => a !== dept)
                            : [...formData.affectedAreas, dept];
                          setFormData(prev => ({ ...prev, affectedAreas: updatedAreas }));
                        }}
                      />
                      <span className="text-sm">{dept}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {showCustom && (
            <div>
              <label className="form-label">Custom Engagement Description</label>
              <EnhanceWithAI
                value={formData.customEngagement}
                onChange={(e) => setFormData(prev => ({ ...prev, customEngagement: e.target.value }))}
                placeholder="Describe your custom engagement requirements..."
              />
            </div>
          )}

          {/* Scope & Objectives */}
          <div className="space-y-4">
            <div>
              <label className="form-label">Scope Description</label>
              <EnhanceWithAI
                value={formData.scopeDescription}
                onChange={(e) => setFormData(prev => ({ ...prev, scopeDescription: e.target.value }))}
                placeholder="Describe the scope of the engagement..."
                required
              />
            </div>
            <div>
              <label className="form-label">Key Deliverables</label>
              <EnhanceWithAI
                value={formData.keyDeliverables}
                onChange={(e) => setFormData(prev => ({ ...prev, keyDeliverables: e.target.value }))}
                placeholder="List key deliverables..."
                required
              />
            </div>
          </div>

          {/* Timeline & Milestones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className="input-field"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="form-label">End Date</label>
              <input
                type="date"
                className="input-field"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <label className="form-label">Milestones</label>
            <EnhanceWithAI
              value={formData.milestones}
              onChange={(e) => setFormData(prev => ({ ...prev, milestones: e.target.value }))}
              placeholder="List key milestones and their target dates..."
            />
          </div>

          {/* Additional Notes */}
          <div>
            <label className="form-label">Additional Comments/Notes</label>
            <EnhanceWithAI
              value={formData.additionalNotes}
              onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
              placeholder="Any additional information or special requirements..."
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="btn btn-secondary flex items-center"
              onClick={() => {
                setFormData({
                  projectName: '',
                  clientName: '',
                  engagementTypes: [],
                  departments: [],
                  projectTitle: '',
                  projectObjectives: '',
                  problemStatement: '',
                  affectedAreas: [],
                  customEngagement: '',
                  scopeDescription: '',
                  keyDeliverables: '',
                  startDate: '',
                  endDate: '',
                  milestones: '',
                  additionalNotes: ''
                });
              }}
            >
              <FiX className="mr-2" /> Clear Form
            </button>
            <button type="submit" className="btn btn-primary flex items-center">
              <FiSave className="mr-2" /> Submit Engagement
            </button>
          </div>
        </form>
        
        {submitSuccess && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg flex items-center">
            <FiCheck className="mr-2" /> Engagement form submitted successfully!
          </div>
        )}
        
        {/* Past Submissions */}
        {submissions.length > 0 && (
          <div className="mt-8 border-t pt-8">
            <div className="flex justify-between items-center mb-4"> 
              <h3 className="text-lg font-medium text-gray-900">Past Submissions</h3>
              {currentUser.role !== 'client' && (
              <button
                onClick={handleClearSubmissions}
                className="btn btn-secondary text-sm flex items-center"
              >
                <FiX className="mr-2" /> Clear All Submissions
              </button>
              )}
            </div>
            <div className="space-y-4">
              {submissions.map((submission) => (
                <div key={submission.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900">{submission.data.projectName}</h4>
                      <p className="text-sm text-gray-500">{submission.data.clientName}</p>
                      {currentUser.role !== 'client' && (
                        <p className="text-xs text-gray-400 mt-1">
                          Submitted by: {submission.submitterRole}
                        </p>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(submission.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                    <div>
                      <span className="font-medium">Start Date:</span> {submission.data.startDate}
                    </div>
                    <div>
                      <span className="font-medium">End Date:</span> {submission.data.endDate}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Upload Files for Analysis</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500">
                            <span>Upload files</span>
                            <input
                              type="file"
                              multiple
                              className="sr-only"
                              onChange={handleFileUpload}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PDF, Excel, Word up to 10MB each
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleStartDiagnostic(submission)}
                      className="btn btn-primary flex items-center text-sm"
                    >
                      <FiPlay className="mr-1" /> Start Diagnostic
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
};

export default EngagementScoping;