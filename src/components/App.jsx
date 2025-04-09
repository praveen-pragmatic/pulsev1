import React, { useState } from 'react';
import { FiArrowLeft, FiZap, FiSettings } from 'react-icons/fi';
import { useAuth } from '../auth/AuthContext';
import useStore from '../store/store';
import Dashboard from './Dashboard';
import ClientRfp from './ClientRfp';
import RfpManagement from './RfpManagement';
import CreateInfographic from './AdminFeatures/CreateInfographic';
import CreateTaskList from './AdminFeatures/CreateTaskList';
import Sidebar from './Sidebar';
import SettingsMenu from './SettingsMenu';

function App() {
  const { currentUser, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { 
    showProfile,
    setShowProfile,
    modals,
    toggleModal,
    selectedClient,
    setSelectedClient,
    demoMode,
    toggleDemoMode
  } = useStore();

  const renderContent = () => {
    switch (activeSection) {
      case 'client-rfp':
        return <ClientRfp />;
      case 'rfp-management':
        return <RfpManagement />;
      case 'create-infographic':
        return <CreateInfographic />;
      case 'create-task-list':
        return <CreateTaskList />;
      default:
        return <Dashboard onClientSelect={setSelectedClient} />;
    }
  };

  return (
    <div className="flex h-screen bg-enterprise-50">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-900 flex items-center">
                {selectedClient ? 'Client Details' : 'Jarvis'}
                {!selectedClient && (
                  <div className="ml-3 badge badge-primary flex items-center">
                    <FiZap className="mr-2" />
                    <span>Demo Mode</span>
                    <span className="ml-2 text-xs">({currentUser.role})</span>
                  </div>
                )}
              </h1>
              <div className="flex space-x-4">
                {selectedClient && (
                  <button 
                    className="btn btn-secondary flex items-center"
                    onClick={() => {
                      setSelectedClient(null);
                      setActiveSection('dashboard');
                    }}
                  >
                    <FiArrowLeft className="mr-2" />
                    Back to Dashboard
                  </button>
                )}
                <div className="relative">
                  <button 
                    className="btn btn-secondary flex items-center"
                    onClick={() => setSettingsOpen(!settingsOpen)}
                    aria-label="Settings"
                  >
                    <FiSettings className="mr-2" />
                    Settings
                  </button>
                  
                  {settingsOpen && (
                    <>
                      <SettingsMenu 
                        onClose={() => setSettingsOpen(false)}
                        setActiveSection={setActiveSection}
                      />
                      <div 
                        className="fixed inset-0 z-40"
                        onClick={() => setSettingsOpen(false)}
                      ></div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-3 sm:p-4 lg:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}