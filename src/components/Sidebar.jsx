import React from 'react';
import { FiHome, FiUpload, FiBarChart2, FiList, FiPieChart, FiMap, FiTarget, FiActivity, FiSearch, FiTrendingUp, FiZap, FiGrid, FiFileText, FiBell, FiSettings } from 'react-icons/fi';
import { useAuth } from '../auth/AuthContext';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const { currentUser } = useAuth();
  
  // Partner-specific navigation
  const partnerNavItems = [
    {
      id: 'rfps',
      name: 'RFPs',
      icon: <FiFileText className="w-5 h-5" />,
      active: true
    }
  ];
  
  // Regular navigation items
  const regularNavItems = [
    ...(currentUser.role === 'admin' ? [{
      id: 'action',
      name: 'Action',
      icon: <FiBell className="w-5 h-5" />,
      active: true
    }, {
      id: 'admin-tools',
      name: 'Admin Tools',
      icon: <FiSettings className="w-5 h-5" />,
      subItems: [
        { id: 'create-task-list', name: 'Create Task List', icon: <FiList className="w-5 h-5" /> },
        { id: 'create-infographic', name: 'Create Infographic', icon: <FiBarChart2 className="w-5 h-5" />, active: true }
      ]
    }] : []),
    ...(currentUser.role === 'admin' ? [{
      id: 'rfp-management',
      name: 'RFP Management',
      icon: <FiFileText className="w-5 h-5" />,
      active: true
    }] : []),
    {
      id: 'diagnose',
      name: 'Diagnose: Current State Assessment',
      icon: <FiSearch className="w-5 h-5" />,
      subItems: [
        { id: 'engagement-scoping', name: 'Engagement & Scoping', icon: <FiTarget className="w-5 h-5" />, active: true },
        { id: 'data-ingestion', name: 'Data Ingestion', icon: <FiUpload className="w-5 h-5" /> },
        { id: 'benchmarks', name: 'Benchmarks', icon: <FiBarChart2 className="w-5 h-5" /> },
        { id: 'marketplace', name: 'App Marketplace', icon: <FiGrid className="w-5 h-5" /> }
      ]
    },
    {
      id: 'discover',
      name: 'Discover',
      icon: <FiTrendingUp className="w-5 h-5" />,
      subItems: [
        { id: 'optimize', name: 'Optimize', icon: <FiActivity className="w-5 h-5" /> },
        { id: 'transformation-plans', name: 'Transform', icon: <FiMap className="w-5 h-5" /> },
        { id: 'execution', name: 'Execution', icon: <FiActivity className="w-5 h-5" /> }
      ]
    },
    {
      id: 'decisions',
      name: 'Future State',
      icon: <FiZap className="w-5 h-5" />,
      subItems: [
        { id: 'client-rfp', name: 'Client RFPs', icon: <FiFileText className="w-5 h-5" /> }
      ] 
    }
  ];

  const navItems = currentUser.role === 'partner' ? partnerNavItems : regularNavItems;

  return (
    <div className="bg-gray-800 text-white w-64 flex-shrink-0 hidden md:flex flex-col h-screen">
      <div className="p-4">
        <h2 className="text-xl font-bold">Pulse</h2>
      </div>
      <nav className="flex-1 overflow-y-auto" style={{ height: 'calc(100vh - 180px)' }}>
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id} className="space-y-1">
              {item.subItems && currentUser.role !== 'partner' ? (
                <>
                  <div className="flex items-center px-4 py-2 text-sm font-medium text-gray-300">
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                  <ul className="ml-4 space-y-1">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.id}>
                        <button
                          onClick={() => setActiveSection(subItem.id)}
                          className={`w-full flex items-center px-4 py-2 text-left ${
                            activeSection === subItem.id
                              ? 'bg-primary-700 text-white'
                              : 'text-gray-300 hover:bg-gray-700'
                          }`}
                        >
                          <span className="mr-3">{subItem.icon}</span>
                          <span>{subItem.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-left ${
                    activeSection === item.id
                      ? 'bg-primary-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="w-full p-4 bg-gray-900 mt-auto">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
            <span className="font-bold text-white">{currentUser.avatar}</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">{currentUser.name}</p>
            <p className="text-xs text-gray-400">{currentUser.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;