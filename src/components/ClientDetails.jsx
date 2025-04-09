import React, { useState } from 'react';
import { FiUsers, FiMapPin, FiGlobe, FiMail, FiPhone, FiCalendar, FiCheck } from 'react-icons/fi';
import useStore from '../store/store';
import { useAuth } from '../auth/AuthContext';

const ClientDetails = ({ clientId = 'integrated-india' }) => {
  const { currentUser } = useAuth();
  const transformItems = useStore((state) => state.transformItems[currentUser?.clientId] || []);
  const optimizeItems = useStore((state) => state.optimizeItems[currentUser?.clientId] || []);
  const [assignees] = useState([
    { id: 1, name: 'John Smith', role: 'Project Manager' },
    { id: 2, name: 'Sarah Johnson', role: 'Technical Lead' },
    { id: 3, name: 'Mike Chen', role: 'Business Analyst' },
    { id: 4, name: 'Emma Davis', role: 'Developer' }
  ]);
  const [taskAssignments, setTaskAssignments] = useState({});

  const clientData = {
    'integrated-india': {
      name: 'Integrated India',
      logo: '/integrated-india-logo.png', // Placeholder, would need actual logo
      description: '5 Decades of Trust\nPioneer in Investment Advisory\nDedicated & well trained 1,200 professionals\nPAN INDIA Branch Network\nPersonal Financial Planner for Individuals\n\nA Brand Trusted by Millions of Retail Investors over 5 decades',
      industry: 'Financial Services - Registrar and Share Transfer Agent',
      founded: '1995',
      location: 'Chennai, India',
      website: 'https://www.integratedindia.in',
      contacts: {
        email: 'corpserv@integratedindia.in',
        phone: '044-28140801-03',
      },
      leadership: [
        {
          name: 'Sriram Vaidyanathan',
          title: 'Managing Director & CEO',
          photo: '/placeholder-profile.png',
        },
        {
          name: 'G. Anand',
          title: 'Compliance, Capital Market',
          photo: '/placeholder-profile.png',
        },
        {
          name: 'Arun K Iyengar',
          title: 'Digital Initiatives & Mutual Funds',
          photo: '/placeholder-profile.png',
        },
        {
          name: 'R. Murali',
          title: 'Information Technology',
          photo: '/placeholder-profile.png',
        },
        {
          name: 'N. Sathyanarayanan',
          title: 'Finance & Accounts',
          photo: '/placeholder-profile.png',
        },
        {
          name: 'S. Selvakumar',
          title: 'Marketing & Sales Strategy',
          photo: '/placeholder-profile.png',
        },
        {
          name: 'R. Sivakumar',
          title: 'Software Architecture',
          photo: '/placeholder-profile.png',
        },
        {
          name: 'K.N. Subha',
          title: 'Secretarial & Data Analytics',
          photo: '/placeholder-profile.png',
        },
        {
          name: 'L. Sudhakar',
          title: 'Alternate Channel & TIN FC',
          photo: '/placeholder-profile.png',
        },
        {
          name: 'Suresh Babu K',
          title: 'Registry Operations',
          photo: '/placeholder-profile.png',
        },
        {
          name: 'K.T. Vinod Kumar',
          title: 'Principal Officer Insurance',
          photo: '/placeholder-profile.png',
        },
        {
          name: 'V. Prabha',
          title: 'Operations Capital Market',
          photo: '/placeholder-profile.png',
        }
      ],
      services: [
        'Initial Public Offerings and Rights Issues',
        'Dividend / Interest Warrants Processing',
        'Corporate Actions',
        'Regulatory Compliance',
        'Investor Services',
        'Electronic Connectivity with Depositories',
        'Reconciliation of Share Capital Audit'
      ],
      certifications: [
        'ISO 9001:2015 certified',
        'Category I Share Transfer Agent by SEBI',
        'DP with NSDL and CDSL'
      ],
      diagnosticSummary: {
        strengths: [
          'Strong regulatory compliance framework',
          'Robust technology infrastructure',
          'Experienced leadership team',
          'ISO certified processes'
        ],
        improvements: [
          'Digital transformation of customer service',
          'Enhanced data analytics capabilities',
          'Automated compliance monitoring',
          'Cloud migration strategy'
        ]
      }
    }
  };

  const client = clientData[clientId];

  if (!client) {
    return <div className="text-center py-10">Client not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center mr-4">
              <span className="text-2xl font-bold text-gray-500">{client.name.charAt(0)}</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{client.name}</h2>
              <p className="text-gray-600">{client.industry}</p>
            </div>
          </div>
          {currentUser.role !== 'client' && (
            <div className="flex space-x-2">
              <button className="btn btn-secondary">Edit Client</button>
              <button className="btn btn-primary">Start Diagnostic</button>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="flex items-start">
            <FiMapPin className="mt-1 mr-2 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-700">Headquarters</p>
              <p className="text-sm text-gray-600">{client.location}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <FiGlobe className="mt-1 mr-2 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-700">Website</p>
              <a href={client.website} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-600 hover:underline">
                {client.website.replace('https://', '')}
              </a>
            </div>
          </div>
          
          <div className="flex items-start">
            <FiCalendar className="mt-1 mr-2 text-gray-500" />
            <div>
              <p className="text-sm font-medium text-gray-700">Founded</p>
              <p className="text-sm text-gray-600">{client.founded}</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">About</h3>
          <p className="text-gray-600 mb-4">{client.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-md font-medium text-gray-800 mb-2">Contact Information</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <FiMail className="mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600">{client.contacts.email}</span>
                </div>
                <div className="flex items-center">
                  <FiPhone className="mr-2 text-gray-500" />
                  <span className="text-sm text-gray-600">{client.contacts.phone}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-md font-medium text-gray-800 mb-2">Certifications</h4>
              <ul className="space-y-1">
                {client.certifications.map((cert, idx) => (
                  <li key={idx} className="flex items-start">
                    <FiCheck className="mt-1 mr-2 text-green-500" />
                    <span className="text-sm text-gray-600">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Leadership Team</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {client.leadership.map((leader, idx) => (
            <div key={idx} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full mb-3 flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-500">{leader.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <h4 className="text-md font-medium text-gray-900">{leader.name}</h4>
                <p className="text-sm text-gray-600">{leader.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Services Offered</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {client.services.map((service, idx) => (
            <div key={idx} className="flex items-start">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                  <FiCheck className="h-4 w-4 text-primary-600" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">{service}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Diagnostic Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-md font-medium text-gray-800 mb-2 text-green-600">Strengths</h4>
            <ul className="space-y-2">
              {client.diagnosticSummary.strengths.map((strength, idx) => (
                <li key={idx} className="flex items-start">
                  <FiCheck className="mt-1 mr-2 text-green-500" />
                  <span className="text-sm text-gray-600">{strength}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-medium text-gray-800 mb-2 text-primary-600">Improvement Areas</h4>
            <ul className="space-y-2">
              {client.diagnosticSummary.improvements.map((improvement, idx) => (
                <li key={idx} className="flex items-start">
                  <FiCheck className="mt-1 mr-2 text-primary-500" />
                  <span className="text-sm text-gray-600">{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Transform Requirements Section */}
      {transformItems.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Transform Requirements</h3>
          <div className="space-y-4">
            {transformItems.map((item) => (
              <div key={item.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
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
                  {currentUser.role !== 'client' && (
                  <div>
                    <h5 className="text-xs font-medium text-gray-700 uppercase">Recommendation</h5>
                    <p className="text-sm text-gray-600">{item.recommendation}</p>
                  </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Optimization Items Section */}
      {optimizeItems.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Optimization Items</h3>
          <div className="space-y-4">
            {optimizeItems.map((item) => (
              <div key={item.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-mono text-primary-600 bg-primary-50 px-2 py-0.5 rounded">
                        {item.optimizeId}
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
                  <div className="flex justify-between items-center">
                    <div>
                      <h5 className="text-xs font-medium text-gray-700 uppercase">Assignee</h5>
                      <select
                        className="input-field text-sm mt-1"
                        value={taskAssignments[item.id] || ''}
                        onChange={(e) => setTaskAssignments(prev => ({
                          ...prev,
                          [item.id]: e.target.value
                        }))}
                      >
                        <option value="">Allocate to...</option>
                        {assignees.map(user => (
                          <option key={user.id} value={user.id}>
                            {user.name} ({user.role})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-xs font-medium text-gray-700 uppercase">Recommendation</h5>
                    <p className="text-sm text-gray-600">{item.recommendation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDetails;