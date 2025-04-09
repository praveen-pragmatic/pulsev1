import React, { useState, useEffect } from 'react';
import { FiAlertTriangle, FiCheckCircle, FiFileText, FiSearch, FiThumbsUp, FiThumbsDown, FiArrowRight } from 'react-icons/fi';
import useStore from '../store/store';
import { useAuth } from '../auth/AuthContext';

const DiagnosticAnalysis = () => {
  const [analysisStatus, setAnalysisStatus] = useState('analyzing');
  const [findings, setFindings] = useState([]);
  const { currentUser } = useAuth();
  const uploadedFiles = useStore((state) => state.uploadedFiles[currentUser?.clientId] || []);
  const [feedback, setFeedback] = useState({});
  const [movedFindings, setMovedFindings] = useState({});
  const { 
    transformItems,
    addTransformItem,
    addOptimizeItem 
  } = useStore((state) => ({
    transformItems: state.transformItems[currentUser?.clientId] || [],
    addTransformItem: state.addTransformItem,
    addOptimizeItem: state.addOptimizeItem
  }));
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [engagement, setEngagement] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);

  useEffect(() => {
    // Load engagement data from localStorage
    const savedEngagement = localStorage.getItem('current_diagnostic');
    if (savedEngagement) {
      setEngagement(JSON.parse(savedEngagement));
    }
  }, []);

  // Simulated diagnostic checks for wealth advisor CRM
  const diagnosticChecks = {
    clientData: {
      title: 'Client Data Management',
      checks: [
        'Client profile completeness',
        'Contact information validation',
        'Investment preferences documentation',
        'Risk profile assessment',
        'KYC documentation'
      ]
    },
    portfolioManagement: {
      title: 'Portfolio Management',
      checks: [
        'Investment strategy documentation',
        'Portfolio rebalancing frequency',
        'Performance reporting structure',
        'Asset allocation tracking',
        'Risk management protocols'
      ]
    },
    communication: {
      title: 'Client Communication',
      checks: [
        'Meeting documentation process',
        'Follow-up workflow',
        'Client reporting templates',
        'Communication frequency tracking',
        'Digital engagement channels'
      ]
    },
    compliance: {
      title: 'Regulatory Compliance',
      checks: [
        'Regulatory documentation',
        'Compliance monitoring',
        'Audit trail maintenance',
        'Disclosure requirements',
        'License and certification tracking'
      ]
    }
  };

  const generateImpact = (area, check) => {
    const impacts = {
      'Client Data Management': 'Incomplete client data leads to ineffective service delivery and compliance risks.',
      'Portfolio Management': 'Suboptimal portfolio performance and increased operational risks.',
      'Client Communication': 'Reduced client satisfaction and potential relationship deterioration.',
      'Regulatory Compliance': 'Increased regulatory risks and potential compliance violations.'
    };
    return impacts[area] || 'Impact on operational efficiency and service quality.';
  };

  const generateRecommendation = (area, check) => {
    const recommendations = {
      'Client Data Management': 'Implement structured data collection processes and regular data quality audits.',
      'Portfolio Management': 'Establish automated portfolio monitoring and rebalancing workflows.',
      'Client Communication': 'Deploy a centralized communication management system with automated tracking.',
      'Regulatory Compliance': 'Implement comprehensive compliance monitoring and documentation system.'
    };
    return recommendations[area] || 'Establish standardized processes and automated workflows.';
  };

  useEffect(() => {
    const runAnalysis = async () => {
      setAnalysisStatus('analyzing');
      setCurrentStep(0);
      setStepProgress(0);
      let tempFindings = [];

      // Show file analysis first
      if (uploadedFiles.length > 0) {
        setCurrentStep(-1); // Special step for file analysis
        for (let i = 0; i < uploadedFiles.length; i++) {
          const file = uploadedFiles[i];
          setStepProgress((i / uploadedFiles.length) * 100);
          
          // Simulate file analysis
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Add file-specific findings
          if (file.type.includes('pdf')) {
            tempFindings.push({
              id: Math.random().toString(36).substr(2, 9),
              area: 'Document Analysis',
              finding: `Analysis of ${file.name} reveals potential process optimization opportunities`,
              severity: 'medium',
              impact: 'Current document workflow may have inefficiencies',
              recommendation: 'Consider implementing automated document processing'
            });
          } else if (file.type.includes('spreadsheet') || file.name.endsWith('.xlsx')) {
            tempFindings.push({
              id: Math.random().toString(36).substr(2, 9),
              area: 'Data Analysis',
              finding: `Data structure analysis in ${file.name} indicates manual data handling`,
              severity: 'high',
              impact: 'Manual data processing increases error risk and processing time',
              recommendation: 'Implement automated data validation and processing workflows'
            });
          }
          
          setFindings([...tempFindings]);
        }
      }
      
      try {
        const areas = Object.entries(diagnosticChecks);
        
        for (let i = 0; i < areas.length; i++) {
          setCurrentStep(i);
          const [area, { title, checks }] = areas[i];
          
          // Analyze each check in the area
          for (let j = 0; j < checks.length; j++) {
            const check = checks[j];
            setStepProgress((j / checks.length) * 100);
            
            // Simulate analysis time for each check
            await new Promise(resolve => setTimeout(resolve, 500));
            
            if (Math.random() < 0.7) {
              const severity = Math.random() < 0.3 ? 'critical' : Math.random() < 0.7 ? 'high' : 'medium';
              tempFindings.push({
                id: Math.random().toString(36).substr(2, 9),
                area: title,
                finding: check,
                severity,
                impact: generateImpact(title, check),
                recommendation: generateRecommendation(title, check)
              });
              
              // Update findings in real-time
              setFindings([...tempFindings]);
            }
          }
        }
        
        setAnalysisComplete(true);
        setAnalysisStatus('completed');
      } catch (error) {
        console.error('Analysis failed:', error);
        setAnalysisStatus('error');
      }
    };

    if (engagement) {
      runAnalysis();
    }
  }, [engagement]);

  const handleFeedback = (findingId, isPositive) => {
    setFeedback(prev => ({
      ...prev,
      [findingId]: isPositive
    }));
  };

  const handleMoveFinding = (findingId, destination) => {
    const finding = findings.find(f => f.id === findingId);
    
    if (finding && currentUser.clientId) {
      const itemData = {
        id: finding.id,
        title: finding.finding,
        area: finding.area,
        severity: finding.severity,
        impact: finding.impact,
        recommendation: finding.recommendation,
        projectName: engagement.data.projectName,
        timestamp: new Date().toISOString()
      };
      
      if (destination === 'transform') {
        addTransformItem(currentUser.clientId, itemData);
      } else if (destination === 'optimize') {
        addOptimizeItem(currentUser.clientId, itemData);
      }
    }
    
    setMovedFindings(prev => ({
      ...prev,
      [findingId]: destination
    }));
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'critical':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 flex items-center">
            <FiAlertTriangle className="mr-1" /> Critical
          </span>
        );
      case 'high':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800 flex items-center">
            High
          </span>
        );
      case 'medium':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 flex items-center">
            Medium
          </span>
        );
      default:
        return null;
    }
  };

  if (analysisStatus === 'analyzing') {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Analyzing {Object.keys(diagnosticChecks)[currentStep]}
            </h3>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-600 transition-all duration-300"
                style={{ width: `${stepProgress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="space-y-4">
            {findings.map(finding => (
              <div key={finding.id} className="bg-gray-50 p-3 rounded-lg animate-pulse-slow">
                <div className="flex items-center">
                  <FiArrowRight className="text-primary-500 mr-2" />
                  <span className="text-sm text-gray-700">{finding.finding}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (analysisStatus === 'error') {
    return (
      <div className="bg-red-50 p-6 rounded-lg">
        <h3 className="text-red-800 font-medium">Analysis Error</h3>
        <p className="text-red-600">Failed to analyze engagement data. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {uploadedFiles.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Uploaded Files Analysis</h3>
          <div className="space-y-3">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <FiFileText className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024).toFixed(1)} KB • {new Date(file.lastModified).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                  Analyzed
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Diagnostic Analysis</h2>
            <p className="text-gray-600">
              {engagement ? `Analyzing ${engagement.data.projectName}` : 'Loading...'}
            </p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('current_diagnostic');
              window.history.back();
            }}
            className="btn btn-secondary"
          >
            Back to Engagements
          </button>
        </div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Diagnostic Analysis Results</h2>
            <p className="text-gray-600">
              Analysis for: {engagement.data.projectName}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              {findings.length} findings identified
            </span>
          </div>
        </div>

        <div className="space-y-6">
          {Object.entries(diagnosticChecks).map(([key, { title }]) => {
            const areaFindings = findings.filter(f => f.area === title);
            return (
              <div key={key} className="border rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
                {areaFindings.length > 0 ? (
                  <div className="space-y-4">
                    {areaFindings.map(finding => (
                      <div key={finding.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center">
                              <FiFileText className="text-gray-400 mr-2" />
                              <h4 className="font-medium text-gray-900">{finding.finding}</h4>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{finding.impact}</p>
                          </div>
                          <div className="ml-4">
                            {getSeverityBadge(finding.severity)}
                          </div>
                        </div>
                        <div className="mt-2">
                          <h5 className="text-sm font-medium text-gray-700">Recommendation</h5>
                          <p className="text-sm text-gray-600">{finding.recommendation}</p>
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <button
                                onClick={() => handleFeedback(finding.id, true)}
                                className={`p-2 rounded-full ${
                                  feedback[finding.id] === true 
                                    ? 'bg-green-100 text-green-600' 
                                    : 'hover:bg-gray-100 text-gray-400'
                                }`}
                                title="Accurate finding"
                              >
                                <FiThumbsUp className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleFeedback(finding.id, false)}
                                className={`p-2 rounded-full ${
                                  feedback[finding.id] === false 
                                    ? 'bg-red-100 text-red-600' 
                                    : 'hover:bg-gray-100 text-gray-400'
                                }`}
                                title="Inaccurate finding"
                              >
                                <FiThumbsDown className="w-5 h-5" />
                              </button>
                            </div>
                            <div className="flex items-center space-x-2">
                              {!movedFindings[finding.id] && (
                                <>
                                  <button
                                    onClick={() => handleMoveFinding(finding.id, 'transform')}
                                    className="px-3 py-1 text-sm bg-primary-100 text-primary-700 rounded-full hover:bg-primary-200"
                                  >
                                    Move to Transform
                                  </button>
                                  <button
                                    onClick={() => handleMoveFinding(finding.id, 'optimize')}
                                    className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full hover:bg-green-200"
                                  >
                                    Move to Optimize
                                  </button>
                                </>
                              )}
                              {movedFindings[finding.id] && (
                                <span className="text-sm text-gray-500 italic">
                                  Moved to {movedFindings[finding.id]}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <FiCheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p className="text-gray-600">No gaps identified in this area</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DiagnosticAnalysis;