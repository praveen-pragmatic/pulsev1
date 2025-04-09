import React, { useState } from 'react';
import { FiAlertTriangle, FiAlertCircle, FiCheckCircle, FiBarChart2, FiDownload, FiExternalLink } from 'react-icons/fi';

const GapAnalysis = () => {
  const [selectedClient, setSelectedClient] = useState('ABC Financial');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  
  const clientOptions = [
    'ABC Financial',
    'XYZ Banking',
    'Global Investments',
    'Secure Payments Inc'
  ];
  
  const categoryOptions = [
    'All Categories',
    'Operational Efficiency',
    'Risk Management',
    'Customer Experience',
    'Regulatory Compliance',
    'Technology Infrastructure',
    'Financial Performance'
  ];

  const gapData = [
    {
      id: 1,
      category: 'Regulatory Compliance',
      finding: 'Outdated AML Screening Process',
      severity: 'critical',
      impact: 'High risk of regulatory penalties and reputational damage',
      benchmark: 'Real-time AML screening with automated case management',
      currentState: 'Manual review process with 48-hour completion window',
      recommendation: 'Implement automated AML screening solution with real-time alerts'
    },
    {
      id: 2,
      category: 'Technology Infrastructure',
      finding: 'Legacy Core Banking System',
      severity: 'high',
      impact: 'Limited flexibility, high maintenance costs, and slow implementation of new features',
      benchmark: 'Modern, API-first core banking platform',
      currentState: '15-year old monolithic system with limited API capabilities',
      recommendation: 'Phased migration to cloud-based core banking solution'
    },
    {
      id: 3,
      category: 'Customer Experience',
      finding: 'Fragmented Customer Communication',
      severity: 'medium',
      impact: 'Customer confusion, increased support calls, and lower satisfaction scores',
      benchmark: 'Unified omnichannel communication with consistent messaging',
      currentState: 'Siloed communication channels with inconsistent messaging',
      recommendation: 'Implement central customer communication platform with templating and approval workflows'
    },
    {
      id: 4,
      category: 'Operational Efficiency',
      finding: 'Manual Data Entry Processes',
      severity: 'high',
      impact: 'High error rates, processing delays, and excessive operational costs',
      benchmark: 'Automated data capture and validation with minimal manual intervention',
      currentState: 'Multiple manual data entry points across customer journey',
      recommendation: 'Deploy OCR and automated data capture technologies with validation workflows'
    },
    {
      id: 5,
      category: 'Risk Management',
      finding: 'Inadequate Data Backup Procedures',
      severity: 'critical',
      impact: 'Risk of data loss, extended recovery times, and business continuity concerns',
      benchmark: 'Automated daily backups with off-site replication and regular testing',
      currentState: 'Weekly manual backups with inconsistent verification',
      recommendation: 'Implement automated backup solution with daily incremental and weekly full backups, plus quarterly recovery testing'
    }
  ];

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
            <FiAlertCircle className="mr-1" /> High
          </span>
        );
      case 'medium':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 flex items-center">
            Medium
          </span>
        );
      case 'low':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 flex items-center">
            <FiCheckCircle className="mr-1" /> Low
          </span>
        );
      default:
        return null;
    }
  };

  const filteredGaps = selectedCategory === 'All Categories' 
    ? gapData 
    : gapData.filter(gap => gap.category === selectedCategory);

  // Count gaps by severity
  const criticalCount = gapData.filter(gap => gap.severity === 'critical').length;
  const highCount = gapData.filter(gap => gap.severity === 'high').length;
  const mediumCount = gapData.filter(gap => gap.severity === 'medium').length;
  const lowCount = gapData.filter(gap => gap.severity === 'low').length;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Gap Analysis</h2>
            <p className="text-gray-600">Identified gaps between current state and industry benchmarks.</p>
          </div>
          <div className="flex space-x-2">
            <button className="btn btn-secondary flex items-center">
              <FiDownload className="mr-2" /> Export
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-1">
              Client
            </label>
            <select
              id="client"
              className="input-field"
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
            >
              {clientOptions.map((client) => (
                <option key={client} value={client}>
                  {client}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              className="input-field"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex items-center">
              <FiAlertTriangle className="h-5 w-5 text-red-600 mr-2" />
              <span className="text-lg font-bold text-gray-900">{criticalCount}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Critical Gaps</p>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-lg">
            <div className="flex items-center">
              <FiAlertCircle className="h-5 w-5 text-orange-600 mr-2" />
              <span className="text-lg font-bold text-gray-900">{highCount}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">High Priority</p>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center">
              <span className="text-lg font-bold text-gray-900">{mediumCount}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Medium Priority</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center">
              <FiCheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-lg font-bold text-gray-900">{lowCount}</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Low Priority</p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Finding</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredGaps.map((gap) => (
                <tr key={gap.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {gap.finding}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {gap.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getSeverityBadge(gap.severity)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-primary-600 hover:text-primary-800 font-medium flex items-center">
                      View Details <FiExternalLink className="ml-1" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {filteredGaps.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Gap Details</h3>
          
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-medium text-gray-900">{filteredGaps[0].finding}</h4>
                <p className="text-sm text-gray-600">{filteredGaps[0].category}</p>
              </div>
              {getSeverityBadge(filteredGaps[0].severity)}
            </div>
            
            <div className="space-y-4">
              <div>
                <h5 className="text-sm font-medium text-gray-700">Impact</h5>
                <p className="text-sm text-gray-600">{filteredGaps[0].impact}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-gray-700">Current State</h5>
                  <p className="text-sm text-gray-600">{filteredGaps[0].currentState}</p>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-gray-700">Industry Benchmark</h5>
                  <p className="text-sm text-gray-600">{filteredGaps[0].benchmark}</p>
                </div>
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-gray-700">Recommendation</h5>
                <p className="text-sm text-gray-600">{filteredGaps[0].recommendation}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GapAnalysis;