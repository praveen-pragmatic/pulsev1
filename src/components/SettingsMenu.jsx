import React from 'react';
import { FiUser, FiUsers, FiLogOut, FiBook, FiX } from 'react-icons/fi';
import { useAuth } from '../auth/AuthContext';
import useStore from '../store/store'; 

const SettingsMenu = ({ onClose, setActiveSection }) => {
  const { currentUser, logout } = useAuth();
  const { toggleModal, setShowProfile, clearStore } = useStore(state => ({
    toggleModal: state.toggleModal,
    setShowProfile: state.setShowProfile,
    clearStore: state.clearStore || (() => {})
  }));

  const handleAction = (action) => {
    switch (action) {
      case 'knowledge-central':
        onClose();
        setActiveSection('knowledge-central');
        break;
      case 'profile':
        onClose();
        setShowProfile(true);
        break;
      case 'ekyc':
        onClose();
        setTimeout(() => toggleModal('ekyc'), 0);
        break;
      case 'partner':
        onClose();
        setTimeout(() => toggleModal('partner'), 0);
        break;
      case 'logout':
        onClose();
        logout();
        break;
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-50">
      <div className="py-1">
        <button
          onClick={() => handleAction('knowledge-central')}
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
        >
          <FiBook className="mr-2 h-4 w-4" />
          Knowledge Central
        </button>
        
        <button
          onClick={() => handleAction('profile')}
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
        >
          <FiUser className="mr-2 h-4 w-4" />
          Profile Settings
        </button>
        
        {currentUser.role === 'admin' && (
          <>
            <hr className="my-1" />
            <button
              onClick={() => handleAction('ekyc')} 
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <FiUsers className="mr-2 h-4 w-4" />
              New Client Setup
            </button>
            <button
              onClick={() => handleAction('partner')} 
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <FiUsers className="mr-2 h-4 w-4" />
              New Partner Setup
            </button>
          </>
        )}
        
        {currentUser.role === 'admin' && (
          <>
            <hr className="my-1" />
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all RFP data? This action cannot be undone.')) {
                  clearStore?.();
                  onClose();
                }
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
            >
              <FiX className="mr-2 h-4 w-4" />
              Clear RFP Data
            </button>
          </>
        )}
        
        <hr className="my-1" />
        <button
          onClick={() => handleAction('logout')}
          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
        >
          <FiLogOut className="mr-2 h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default SettingsMenu;