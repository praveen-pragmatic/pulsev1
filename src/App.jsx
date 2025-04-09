import React, { useState, lazy, Suspense, useCallback } from 'react';
import { FiArrowLeft, FiUpload, FiBarChart2, FiUsers, FiFile, FiSearch, FiList, FiZap, FiSettings } from 'react-icons/fi';

// Lazy load components
const Sidebar = lazy(() => import('./components/Sidebar'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const EkycOnboarding = lazy(() => import('./components/EkycOnboarding'));
const PartnerOnboarding = lazy(() => import('./components/PartnerOnboarding'));
const ProjectManagement = lazy(() => import('./components/ProjectManagement'));
const DataIngestion = lazy(() => import('./components/DataIngestion'));
const ActionView = lazy(() => import('./components/ActionView'));
const Benchmarks = lazy(() => import('./components/Benchmarks'));
const EngagementScoping = lazy(() => import('./components/EngagementScoping'));
const Marketplace = lazy(() => import('./components/Marketplace'));
const DiagnosticAnalysis = lazy(() => import('./components/DiagnosticAnalysis'));
const QuestionnaireBuilder = lazy(() => import('./components/QuestionnaireBuilder'));
const GapAnalysis = lazy(() => import('./components/GapAnalysis'));
const KnowledgeCentral = lazy(() => import('./components/KnowledgeCentral'));
const TransformationPlans = lazy(() => import('./components/TransformationPlans'));
const OptimizationPlans = lazy(() => import('./components/OptimizationPlans'));
const ClientRfp = lazy(() => import('./components/ClientRfp'));
const ClientDetails = lazy(() => import('./components/ClientDetails'));
const FutureState = lazy(() => import('./components/FutureState'));
const Profile = lazy(() => import('./components/Profile'));
const Login = lazy(() => import('./components/Login'));
const PartnerDashboard = lazy(() => import('./components/PartnerDashboard'));
import { useAuth } from './auth/AuthContext';
import VoiceAgent from './components/VoiceAgent';
import useStore from './store/store';
import RfpManagement from './components/RfpManagement';
import SettingsMenu from './components/SettingsMenu';
import CreateTaskList from './components/AdminFeatures/CreateTaskList';
import CreateInfographic from './components/AdminFeatures/CreateInfographic';

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
    clearStore
  } = useStore();

  // Memoize the section change handler
  const handleSectionChange = useCallback((event) => {
    if (event.detail) {
      setActiveSection(event.detail);
    }
  }, []);

  // Listen for section change events
  React.useEffect(() => {
    window.addEventListener('setActiveSection', handleSectionChange);
    return () => window.removeEventListener('setActiveSection', handleSectionChange);
  }, [handleSectionChange]);
  
  const handleSettingsAction = (action) => {
    // Close settings menu first 
    setSettingsOpen(false);

    // Then perform the action
    switch(action) {
      case 'ekyc':
        toggleModal('ekyc');
        break;
      case 'partner':
        toggleModal('partner');
        break;
      case 'profile':
        setShowProfile(true);
        break;
      case 'advanced':
        setShowAdvancedSettings(true);
        break;
      default:
        break;
    }
  };
  
  const renderContent = () => {
    if (showAdvancedSettings && currentUser.role === 'admin') {
      return (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Advanced Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Client Management</h3>
                <p className="text-gray-600 mb-4">Configure and manage client onboarding settings</p>
                <button
                  onClick={() => toggleModal('ekyc')}
                  className="btn btn-primary w-full"
                  aria-label="New Client Setup"
                >
                  New Client Setup
                </button>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Partner Management</h3>
                <p className="text-gray-600 mb-4">Configure and manage partner onboarding settings</p>
                <button
                  onClick={() => toggleModal('partner')}
                  className="btn btn-primary w-full"
                  aria-label="New Partner Setup"
                >
                  New Partner Setup
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    switch (activeSection) {
      case 'action':
        return <ActionView />;
      case 'profile':
        return <Profile />;
      case 'dashboard':
        if (currentUser.role === 'partner') {
          return <PartnerDashboard />;
        } else if (currentUser.role === 'client') {
          return <ClientDetails clientId={currentUser.clientId} />;
        } else {
          return selectedClient ? 
            <ClientDetails clientId={selectedClient} /> : 
            <Dashboard onClientSelect={setSelectedClient} />;
        }
      case 'execution':
        return <TransformationPlans />;
      case 'engagement-scoping':
        return <EngagementScoping setActiveSection={setActiveSection} />;
      case 'diagnostic':
        return <DiagnosticAnalysis />;
      case 'data-ingestion':
        return <DataIngestion />;
      case 'benchmarks':
        return <Benchmarks />;
      case 'marketplace':
        return <Marketplace />;
      case 'optimize':
        return <OptimizationPlans />;
      case 'questionnaires':
        return <QuestionnaireBuilder />;
      case 'gap-analysis':
        return <GapAnalysis />;
      case 'knowledge-central':
        return <KnowledgeCentral />;
      case 'transformation-plans':
        return <TransformationPlans />;
      case 'future-state':
        return <FutureState />;
      case 'create-infographic':
        return <CreateInfographic />;
      case 'client-rfp':
        return <ClientRfp />;
      case 'rfp-management':
        return <RfpManagement />;
      case 'create-task-list':
        return <CreateTaskList />;
      case 'transform':
        return <TransformationPlans />;
      default:
        return <Dashboard onClientSelect={setSelectedClient} />;
    }
  };

  if (!currentUser) {
    return <Login />;
  }

  return (
    <div className="flex h-screen bg-enterprise-50">
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={(section) => {
          // Always reset to dashboard when changing sections
          if (section === 'dashboard') {
            setSelectedClient(null);
            setShowProfile(false);
            setShowAdvancedSettings(false);
          }
          setActiveSection(section);
        }} 
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-900 flex items-center">
                {selectedClient ? 'Client Details' : currentUser.role === 'partner' ? 'Partner Dashboard' : currentUser.role === 'client' ? 'Client Dashboard' : 'Pulse by Pragmatic'}
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
      
      {/* Modals */}
      {modals.ekyc && <EkycOnboarding onClose={() => toggleModal('ekyc')} />}
      {modals.partner && <PartnerOnboarding onClose={() => toggleModal('partner')} />}
    </div>
  );
}

export default App;