import React, { useState } from 'react';
import { FiBarChart2, FiFileText, FiUsers, FiAlertTriangle, FiTrendingUp, FiCheckCircle, FiUpload, FiExternalLink, FiStar, FiAward, FiChevronLeft, FiChevronRight, FiZap } from 'react-icons/fi';
import { useAuth } from '../auth/AuthContext';

// Mock data for dashboard
const diagnosticProjects = [
  { id: 5, client: 'Integrated India', category: 'Financial Services', status: 'In Progress', completion: 35, date: '2025-04-12', tier: 'Enterprise' }
];

// Adjust tier distribution to match desired percentages
const desiredDistribution = {
  Freemium: Math.round(diagnosticProjects.length * 0.5),    // 50%
  Professional: Math.round(diagnosticProjects.length * 0.35), // 35%
  Enterprise: Math.round(diagnosticProjects.length * 0.15)   // 15%
};

// Sort projects by ID to ensure consistent distribution
const sortedProjects = [...diagnosticProjects].sort((a, b) => a.id - b.id);

// Distribute tiers according to desired percentages
sortedProjects.forEach((project, index) => {
  if (index < desiredDistribution.Freemium) {
    project.tier = 'Freemium';
  } else if (index < desiredDistribution.Freemium + desiredDistribution.Professional) {
    project.tier = 'Professional';
  } else {
    project.tier = 'Enterprise';
  }
});

// Update the original array with new distribution
diagnosticProjects.length = 0;
diagnosticProjects.push(...sortedProjects);

const Dashboard = ({ onClientSelect }) => {
  const { currentUser } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [subscriptionStats] = useState({
    freemium: {
      count: 20,
      mrr: 30 // in lakhs
    },
    professional: {
      count: 10,
      mrr: 30 // in lakhs
    },
    enterprise: {
      count: 5,
      mrr: 48 // in lakhs
    }
  });
  
  const getTierCounts = () => {
    return {
      freemium: subscriptionStats.freemium.count,
      professional: subscriptionStats.professional.count,
      enterprise: subscriptionStats.enterprise.count
    };
  };

  const getRecentActivity = () => {
    if (currentUser.role === 'client') {
      // Return client-specific activities based on their metrics
      return [
        {
          type: 'document',
          icon: <FiUpload className="h-4 w-4 text-blue-600" />,
          iconBg: 'bg-blue-100',
          message: `${currentUser.metrics.completedActions} diagnostic actions completed`,
          timestamp: '2 hours ago'
        },
        {
          type: 'analysis',
          icon: <FiBarChart2 className="h-4 w-4 text-green-600" />,
          iconBg: 'bg-green-100',
          message: `${currentUser.metrics.pendingActions} actions pending completion`,
          timestamp: '1 day ago'
        },
        {
          type: 'response',
          icon: <FiUsers className="h-4 w-4 text-purple-600" />,
          iconBg: 'bg-purple-100',
          message: `Diagnostic progress: ${currentUser.metrics.diagnosticProgress}% complete`,
          timestamp: '3 days ago'
        }
      ];
    }
    
    // Default activities for admin/consultants
    return [
      {
        type: 'document',
        icon: <FiUpload className="h-4 w-4 text-blue-600" />,
        iconBg: 'bg-blue-100',
        message: 'New documents uploaded for Integrated India',
        timestamp: '1 hour ago'
      },
      {
        type: 'analysis',
        icon: <FiBarChart2 className="h-4 w-4 text-green-600" />,
        iconBg: 'bg-green-100',
        message: 'Gap analysis completed for Integrated India',
        timestamp: '1 day ago'
      },
      {
        type: 'response',
        icon: <FiUsers className="h-4 w-4 text-purple-600" />,
        iconBg: 'bg-purple-100',
        message: '15 new questionnaire responses from Integrated India',
        timestamp: '2 days ago'
      }
    ];
  };

  // Filter and transform data based on user role
  const getDiagnosticProjects = () => {
    if (currentUser.role === 'client') {
      // For client users, show only their own project
      return [{
        id: 1,
        client: currentUser.companyName,
        category: currentUser.metrics.category || 'Financial Services',
        status: currentUser.metrics.diagnosticProgress === 100 ? 'Completed' : 'In Progress',
        completion: currentUser.metrics.diagnosticProgress,
        date: '2025-04-30',
        tier: currentUser.metrics.tier,
        completedActions: currentUser.metrics.completedActions,
        pendingActions: currentUser.metrics.pendingActions
      }];
    }
    // For admin/consultants, show all projects
    return diagnosticProjects;
  };

  const getMetrics = () => {
    if (currentUser.role === 'client') {
      return {
        completedActions: currentUser.metrics.completedActions,
        pendingActions: currentUser.metrics.pendingActions,
        criticalGaps: currentUser.metrics.criticalGaps,
        tier: currentUser.metrics.tier,
        mrr: currentUser.metrics.mrr
      };
    }
    // Default metrics for admin/consultants
    return {
      activeProjects: diagnosticProjects.length,
      completed: diagnosticProjects.filter(p => p.status === 'Completed').length,
      criticalGaps: Math.floor(diagnosticProjects.length * 1.8),
      tiers: getTierCounts()
    };
  };

  const metrics = getMetrics();
  const filteredProjects = getDiagnosticProjects();
  const tierCounts = getTierCounts();

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  const handleClientClick = (clientName) => {
    // Convert client name to a slug - simplified version
    const clientId = clientName.toLowerCase().replace(/\s+/g, '-');
    onClientSelect && onClientSelect(clientId);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-primary-100 text-primary-800">
              <FiFileText className="h-6 w-6" />
            </div>
            <div className="ml-3">
              <h3 className="text-base font-medium text-gray-700">Active Diagnostics</h3>
              <p className="text-3xl font-bold text-gray-900">{currentUser.role === 'client' ? metrics.completedActions + metrics.pendingActions : metrics.activeProjects}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-green-100 text-green-800">
              <FiCheckCircle className="h-6 w-6" />
            </div>
            <div className="ml-3">
              <h3 className="text-base font-medium text-gray-700">Completed</h3>
              <p className="text-3xl font-bold text-gray-900">{currentUser.role === 'client' ? metrics.completedActions : metrics.completed}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-2 rounded-full bg-yellow-100 text-yellow-800">
              <FiAlertTriangle className="h-6 w-6" />
            </div>
            <div className="ml-3">
              <h3 className="text-base font-medium text-gray-700">Critical Gaps Identified</h3>
              <p className="text-3xl font-bold text-gray-900">{currentUser.role === 'client' ? metrics.pendingActions : metrics.criticalGaps}</p>
            </div>
          </div>
        </div>

        {currentUser.role === 'client' ? (
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-primary-100 text-primary-800">
                <FiAward className="h-5 w-5" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-gray-700">Subscription Tier</h3>
                <p className="text-xl font-bold text-gray-900">{metrics.tier}</p>
                <p className="text-xs text-gray-500">MRR: {metrics.mrr}</p>
                <div className="mt-2 text-sm text-gray-600">
                  <p className="text-xs">Completed Actions: {metrics.completedActions}</p>
                  <p className="text-xs">Pending Actions: {metrics.pendingActions}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-base font-medium text-gray-700 mb-3">Subscription Tiers</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-1.5 rounded-full bg-gray-100">
                  <FiStar className="h-4 w-4 text-gray-600" />
                </div>
                <span className="ml-2 text-sm text-gray-600">Freemium (₹{subscriptionStats.freemium.mrr}L MRR)</span>
              </div>
              <span className="text-base font-semibold text-gray-900">{tierCounts.freemium}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-1.5 rounded-full bg-primary-100">
                  <FiAward className="h-4 w-4 text-primary-600" />
                </div>
                <span className="ml-2 text-sm text-gray-600">Professional (₹{subscriptionStats.professional.mrr}L MRR)</span>
              </div>
              <span className="text-base font-semibold text-gray-900">{tierCounts.professional}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-1.5 rounded-full bg-yellow-100">
                  <FiZap className="h-4 w-4 text-yellow-600" />
                </div>
                <span className="ml-2 text-sm text-gray-600">Enterprise (₹{subscriptionStats.enterprise.mrr}L MRR)</span>
              </div>
              <span className="text-base font-semibold text-gray-900">{tierCounts.enterprise}</span>
            </div>
          </div>
        </div>
        )}
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="px-4 py-3 border-b border-gray-200">
            <h3 className="text-base font-medium text-gray-900">{currentUser.role === 'client' ? 'Your Diagnostic Progress' : 'Active Diagnostic Projects'}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completion</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProjects.map((project) => (
                  <tr key={project.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => handleClientClick(project.client)}
                        className="text-sm font-medium text-gray-900 hover:text-primary-600"
                      >
                        {project.client}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                        {project.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${project.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                          project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${project.completion}%` }}></div>
                      </div>
                      <span className="text-xs mt-1 inline-block">{project.completion}%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button 
                        onClick={() => handleClientClick(project.client)}
                        className="text-primary-600 hover:text-primary-800 flex items-center"
                      >
                        View <FiExternalLink className="ml-1" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
              <div className="flex items-center">
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(endIndex, filteredProjects.length)}</span> of{' '}
                  <span className="font-medium">{filteredProjects.length}</span> results
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="btn btn-secondary"
                >
                  <FiChevronLeft className="h-5 w-5" />
                </button>
                <span className="px-4 py-2 text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="btn btn-secondary"
                >
                  <FiChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-4 py-3 border-b border-gray-200">
            <h3 className="text-base font-medium text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-4 space-y-3">
            {getRecentActivity().map((activity, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0">
                  <div className={`h-6 w-6 rounded-full ${activity.iconBg} flex items-center justify-center`}>
                    {activity.icon}
                  </div>
                </div>
                <div className="ml-2">
                  <p className="text-sm text-gray-700">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;