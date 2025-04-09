import React, { useState } from 'react';
import { FiGrid, FiBox, FiPackage, FiDownload, FiStar, FiGitBranch, FiUsers } from 'react-icons/fi';

const apps = [
  {
    id: 'stratroom',
    name: 'StratRoom',
    category: 'Strategic Management',
    description: 'Comprehensive multi-governance platform for strategic planning and execution',
    features: [
      'Integrated strategic planning modules',
      'Multi-governance framework',
      'Strategic execution tracking',
      'Performance analytics'
    ],
    rating: 4.9,
    downloads: 245,
    tags: ['Strategy', 'Governance', 'Planning', 'Execution', 'Analytics']
  },
  {
    id: 'research-pro-ai',
    name: 'Research Pro AI',
    category: 'Research & Analytics',
    description: 'AI-powered research and analytics platform for comprehensive market analysis',
    features: [
      'AI-driven market research',
      'Competitive analysis',
      'Trend forecasting',
      'Automated report generation'
    ],
    rating: 4.9,
    downloads: 175,
    tags: ['AI', 'Research', 'Analytics', 'Market Intelligence']
  },
  {
    id: 'crm-diagnostic',
    name: 'CRM Diagnostic Suite',
    category: 'Diagnostic',
    description: 'Comprehensive CRM system analysis and optimization toolkit',
    features: [
      'Client data quality assessment',
      'Process efficiency analysis',
      'Integration compatibility check',
      'Security compliance verification'
    ],
    rating: 4.8,
    downloads: 128,
    tags: ['CRM', 'Analytics', 'Optimization']
  },
  {
    id: 'wealth-advisor',
    name: 'Wealth Advisory Platform',
    category: 'Financial',
    description: 'End-to-end wealth management and advisory solution',
    features: [
      'Portfolio management',
      'Risk assessment',
      'Client reporting',
      'Investment tracking'
    ],
    rating: 4.6,
    downloads: 95,
    tags: ['Wealth Management', 'Advisory', 'Portfolio']
  },
  {
    id: 'compliance-engine',
    name: 'Compliance Engine',
    category: 'Regulatory',
    description: 'Automated compliance monitoring and reporting system',
    features: [
      'Real-time compliance monitoring',
      'Regulatory reporting',
      'Audit trail management',
      'Risk alerts'
    ],
    rating: 4.9,
    downloads: 156,
    tags: ['Compliance', 'Regulatory', 'Risk']
  },
  {
    id: 'digital-onboarding',
    name: 'Digital Onboarding',
    category: 'Customer Experience',
    description: 'Streamlined customer onboarding and KYC process',
    features: [
      'Document verification',
      'KYC automation',
      'Identity validation',
      'Risk scoring'
    ],
    rating: 4.7,
    downloads: 142,
    tags: ['KYC', 'Onboarding', 'Automation']
  },
  {
    id: 'risk-analyzer',
    name: 'Risk Analysis Engine',
    category: 'Risk Management',
    description: 'Advanced risk assessment and management platform',
    features: [
      'Risk profiling',
      'Scenario analysis',
      'Risk reporting',
      'Mitigation planning'
    ],
    rating: 4.5,
    downloads: 89,
    tags: ['Risk', 'Analytics', 'Management']
  }
];

const categories = [
  'All',
  'Strategic Management',
  'Research & Analytics',
  'Diagnostic',
  'Financial',
  'Regulatory',
  'Customer Experience',
  'Risk Management'
];

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredApps = apps.filter(app => {
    const matchesCategory = selectedCategory === 'All' || app.category === selectedCategory;
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">App Marketplace</h2>
            <p className="text-gray-600">Discover and integrate composable business applications</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                className="input-field pl-10"
                placeholder="Search apps..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FiGrid className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <select
              className="input-field"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map(app => (
            <div key={app.id} className="border rounded-lg p-6 hover:border-primary-200 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                    <FiBox className="h-6 w-6" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">{app.name}</h3>
                    <p className="text-sm text-gray-500">{app.category}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FiStar className="text-yellow-400 h-4 w-4" />
                  <span className="ml-1 text-sm text-gray-600">{app.rating}</span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{app.description}</p>
              
              <div className="space-y-3 mb-4">
                <h4 className="text-sm font-medium text-gray-700">Key Features</h4>
                <ul className="space-y-2">
                  {app.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <FiPackage className="h-4 w-4 text-primary-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {app.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <FiDownload className="h-4 w-4 mr-1" />
                    {app.downloads}
                  </span>
                  <span className="flex items-center">
                    <FiGitBranch className="h-4 w-4 mr-1" />
                    {Math.floor(app.downloads * 0.3)}
                  </span>
                  <span className="flex items-center">
                    <FiUsers className="h-4 w-4 mr-1" />
                    {Math.floor(app.downloads * 0.8)}
                  </span>
                </div>
                <button
                  onClick={() => {
                    const url = app.id === 'research-pro-ai' 
                      ? 'https://researchproai.netlify.app/'
                      : `https://pragmabizide.netlify.app/?intent=install&app=${app.id}`;
                    window.open(url, '_blank');
                  }}
                  className="btn btn-primary text-sm"
                >
                  Install App
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;