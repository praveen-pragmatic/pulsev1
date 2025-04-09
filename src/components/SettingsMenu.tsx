import React from 'react';
import { FiUser, FiUsers, FiSettings, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../auth/AuthContext';
import useStore from '../store/store';

interface SettingsMenuProps {
  onClose: () => void;
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ onClose }) => {
  const { currentUser, logout } = useAuth();
  const { toggleModal, setSelectedClient } = useStore();

  const handleAction = (action: string) => {
    onClose(); // Close menu first
    
    switch (action) {
      case 'profile':
        setSelectedClient(null);
        break;
      case 'ekyc':
        toggleModal('ekyc');
        break;
      case 'partner':
        toggleModal('partner');
        break;
      case 'logout':
        logout();
        break;
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-50">
      <div className="py-1">
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