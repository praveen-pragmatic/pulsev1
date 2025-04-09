import React from 'react';
import { FiTarget, FiTrendingUp, FiClock, FiCheck } from 'react-icons/fi';

const FutureState = () => {
  const futureStateItems = [
    {
      title: 'Digital Transformation',
      status: 'in-progress',
      timeline: '2025 Q4',
      objectives: [
        'Implement cloud-native architecture',
        'Automate 80% of manual processes',
        'Achieve real-time data processing'
      ]
    },
    {
      title: 'Customer Experience Enhancement',
      status: 'planned',
      timeline: '2026 Q1',
      objectives: [
        'Launch omnichannel platform',
        'Reduce response time by 60%',
        'Implement AI-driven support'
      ]
    },
    {
      title: 'Operational Excellence',
      status: 'planned',
      timeline: '2026 Q2',
      objectives: [
        'Achieve Six Sigma certification',
        'Reduce operational costs by 30%',
        'Implement predictive maintenance'
      ]
    }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'in-progress':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 flex items-center">
            <FiClock className="mr-1" /> In Progress
          </span>
        );
      case 'planned':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 flex items-center">
            <FiTarget className="mr-1" /> Planned
          </span>
        );
      case 'completed':
        return (
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 flex items-center">
            <FiCheck className="mr-1" /> Completed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Future State Vision</h2>
            <p className="text-gray-600">Strategic roadmap for organizational transformation</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full flex items-center">
              <FiTrendingUp className="mr-2" />
              <span>2025-2026 Roadmap</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {futureStateItems.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                {getStatusBadge(item.status)}
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-500">Timeline</p>
                <p className="text-lg font-medium text-gray-900">{item.timeline}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Key Objectives</p>
                <ul className="space-y-2">
                  {item.objectives.map((objective, idx) => (
                    <li key={idx} className="flex items-start">
                      <FiCheck className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                      <span className="text-sm text-gray-600">{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Implementation Timeline</h3>
        <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
          <p className="text-gray-500">Timeline visualization would appear here</p>
        </div>
      </div>
    </div>
  );
};

export default FutureState;