import React, { useState } from 'react';
import { FiBarChart2, FiTrendingUp, FiTrendingDown, FiPlus, FiEdit2, FiX } from 'react-icons/fi';

const Benchmarks = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('Financial Services');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [showCustomBenchmarkModal, setShowCustomBenchmarkModal] = useState(false);
  const [customBenchmark, setCustomBenchmark] = useState({
    name: '',
    category: '',
    industryAvg: '',
    topPerformers: '',
    yourPerformance: '',
    description: ''
  });
  
  const benchmarkCategories = [
    'All Categories',
    'Operational Efficiency',
    'Risk Management',
    'Customer Experience',
    'Regulatory Compliance',
    'Technology Infrastructure',
    'Financial Performance'
  ];
  
  const industryOptions = [
    'Financial Services',
    'Banking',
    'Insurance',
    'Investment Management',
    'Payments',
    'Wealth Management'
  ];

  const benchmarkData = [
    {
      id: 1,
      name: 'Document Processing Time',
      category: 'Operational Efficiency',
      industryAvg: '48 hours',
      topPerformers: '4 hours',
      yourPerformance: '72 hours',
      status: 'below-average'
    },
    {
      id: 2,
      name: 'Customer Onboarding Duration',
      category: 'Customer Experience',
      industryAvg: '5 days',
      topPerformers: '24 hours',
      yourPerformance: '3 days',
      status: 'average'
    },
    {
      id: 3,
      name: 'Compliance Training Completion',
      category: 'Regulatory Compliance',
      industryAvg: '85%',
      topPerformers: '98%',
      yourPerformance: '92%',
      status: 'above-average'
    },
    {
      id: 4,
      name: 'System Uptime',
      category: 'Technology Infrastructure',
      industryAvg: '99.5%',
      topPerformers: '99.99%',
      yourPerformance: '99.7%',
      status: 'average'
    },
    {
      id: 5,
      name: 'Risk Assessment Frequency',
      category: 'Risk Management',
      industryAvg: 'Quarterly',
      topPerformers: 'Monthly',
      yourPerformance: 'Bi-annually',
      status: 'below-average'
    },
    {
      id: 6,
      name: 'Cost-Income Ratio',
      category: 'Financial Performance',
      industryAvg: '65%',
      topPerformers: '45%',
      yourPerformance: '58%',
      status: 'above-average'
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'above-average':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 flex items-center">
            <FiTrendingUp className="mr-1" /> Above Average
          </span>
        );
      case 'average':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 flex items-center">
            Average
          </span>
        );
      case 'below-average':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 flex items-center">
            <FiTrendingDown className="mr-1" /> Below Average
          </span>
        );
      default:
        return null;
    }
  };

  const filteredBenchmarks = selectedCategory === 'All Categories' 
    ? benchmarkData 
    : benchmarkData.filter(benchmark => benchmark.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <h2 className="text-xl font-bold text-gray-900">Benchmark Comparison</h2>
            <a href="https://www.apqc.org/" target="_blank" rel="noopener noreferrer" className="ml-2">
              <img src="https://www.apqc.org/themes/custom/apqc/logo.svg" alt="APQC" className="h-6" />
            </a>
          </div>
          <button 
            onClick={() => setShowCustomBenchmarkModal(true)}
            className="btn btn-primary flex items-center"
          >
            <FiPlus className="mr-2" /> Add Custom Benchmark
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
              Industry
            </label>
            <select
              id="industry"
              className="input-field"
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
            >
              {industryOptions.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
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
              {benchmarkCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Benchmark</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry Average</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Top Performers</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Your Performance</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBenchmarks.map((benchmark) => (
                <tr key={benchmark.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {benchmark.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {benchmark.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {benchmark.industryAvg}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {benchmark.topPerformers}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {benchmark.yourPerformance}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getStatusBadge(benchmark.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">About Benchmarks</h3>
          <p className="text-sm text-gray-600">
            These benchmarks are based on industry standards and data collected from {selectedIndustry} organizations. 
            Comparing your performance against these metrics helps identify areas for improvement in your transformation plan.
          </p>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Benchmark Visualization</h3>
        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-base font-medium text-gray-900 mb-4">Wealth Management Advisory Services - Marketing & Sales Process</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Lead Generation */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-2">1</div>
                  <h5 className="font-medium">Lead Generation</h5>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Referral Programs</li>
                  <li>• Digital Marketing</li>
                  <li>• Events & Seminars</li>
                  <li>• Professional Networks</li>
                </ul>
              </div>
              
              {/* Prospect Qualification */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-2">2</div>
                  <h5 className="font-medium">Qualification</h5>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Net Worth Assessment</li>
                  <li>• Investment Goals</li>
                  <li>• Risk Profile</li>
                  <li>• Timeline Analysis</li>
                </ul>
              </div>
              
              {/* Advisory Engagement */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mr-2">3</div>
                  <h5 className="font-medium">Engagement</h5>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Initial Consultation</li>
                  <li>• Portfolio Review</li>
                  <li>• Strategy Presentation</li>
                  <li>• Service Agreement</li>
                </ul>
              </div>
              
              {/* Onboarding & Management */}
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mr-2">4</div>
                  <h5 className="font-medium">Onboarding</h5>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Account Setup</li>
                  <li>• Investment Planning</li>
                  <li>• Regular Reviews</li>
                  <li>• Performance Tracking</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-primary-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-primary-700">Average Client Acquisition Cost</p>
                <p className="text-2xl font-bold text-primary-800">₹85,000</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-green-700">Lead Conversion Rate</p>
                <p className="text-2xl font-bold text-green-800">12.5%</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-purple-700">Client Retention Rate</p>
                <p className="text-2xl font-bold text-purple-800">94%</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-orange-700">Average Portfolio Size</p>
                <p className="text-2xl font-bold text-orange-800">₹2.8Cr</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom Benchmark Modal */}
      {showCustomBenchmarkModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Add Custom Benchmark</h3>
              <button 
                onClick={() => setShowCustomBenchmarkModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <FiX className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              // Add custom benchmark to benchmarkData
              const newBenchmark = {
                id: benchmarkData.length + 1,
                ...customBenchmark,
                status: 'average'
              };
              benchmarkData.push(newBenchmark);
              setShowCustomBenchmarkModal(false);
              setCustomBenchmark({
                name: '',
                category: '',
                industryAvg: '',
                topPerformers: '',
                yourPerformance: '',
                description: ''
              });
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Benchmark Name</label>
                  <input
                    type="text"
                    className="input-field mt-1"
                    value={customBenchmark.name}
                    onChange={(e) => setCustomBenchmark({
                      ...customBenchmark,
                      name: e.target.value
                    })}
                    required
                    placeholder="e.g., Customer Satisfaction Score"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <select
                    className="input-field mt-1"
                    value={customBenchmark.category}
                    onChange={(e) => setCustomBenchmark({
                      ...customBenchmark,
                      category: e.target.value
                    })}
                    required
                  >
                    <option value="">Select Category</option>
                    {benchmarkCategories.filter(cat => cat !== 'All Categories').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    className="input-field mt-1"
                    value={customBenchmark.description}
                    onChange={(e) => setCustomBenchmark({
                      ...customBenchmark,
                      description: e.target.value
                    })}
                    rows="3"
                    placeholder="Describe what this benchmark measures..."
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Industry Average</label>
                    <input
                      type="text"
                      className="input-field mt-1"
                      value={customBenchmark.industryAvg}
                      onChange={(e) => setCustomBenchmark({
                        ...customBenchmark,
                        industryAvg: e.target.value
                      })}
                      required
                      placeholder="e.g., 85%"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Top Performers</label>
                    <input
                      type="text"
                      className="input-field mt-1"
                      value={customBenchmark.topPerformers}
                      onChange={(e) => setCustomBenchmark({
                        ...customBenchmark,
                        topPerformers: e.target.value
                      })}
                      required
                      placeholder="e.g., 95%"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Your Performance</label>
                    <input
                      type="text"
                      className="input-field mt-1"
                      value={customBenchmark.yourPerformance}
                      onChange={(e) => setCustomBenchmark({
                        ...customBenchmark,
                        yourPerformance: e.target.value
                      })}
                      required
                      placeholder="e.g., 82%"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCustomBenchmarkModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Benchmark
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Benchmarks;