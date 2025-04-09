import React, { useState } from 'react';
import { FiUser, FiUsers, FiBriefcase, FiShield, FiGlobe, FiChevronDown } from 'react-icons/fi';
import { useAuth } from '../auth/AuthContext';
import { mockUsers } from '../auth/mockUsers'; 

const Login = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedType, setSelectedType] = useState('internal');
  const [showDropdown, setShowDropdown] = useState(false);
  const { login, error } = useAuth();

  const roleGroups = {
    internal: {
      label: 'Internal Users',
      icon: <FiShield className="h-5 w-5" />,
      groups: {
        'Admin Users': mockUsers.filter(u => u.role === 'admin'),
        'Senior Consultants': mockUsers.filter(u => u.role === 'senior_consultant'),
        'Junior Consultants': mockUsers.filter(u => u.role === 'junior_consultant')
      }
    },
    partner: {
      label: 'Partners',
      icon: <FiGlobe className="h-5 w-5" />,
      groups: {
        'Partner Organizations': mockUsers.filter(u => u.role === 'partner')
      }
    },
    client: {
      label: 'Client Users',
      icon: <FiBriefcase className="h-5 w-5" />,
      groups: {
        'Client Users': mockUsers.filter(u => u.role === 'client')
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = mockUsers.find(u => u.email === selectedRole);
    if (user) {
      login(user.email, user.password);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Welcome to Jarvis</h1>
          <p className="text-primary-600 font-medium mt-2">AI Driven Diagnostics • Discovery • Decisions Engine</p>
          <p className="text-gray-600 mt-4">Select your user type to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-800 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-3 gap-3 mb-6">
            {Object.entries(roleGroups).map(([type, { label, icon }]) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setSelectedType(type);
                  setSelectedRole('');
                }}
                className={`p-4 border rounded-lg text-center transition-colors ${
                  selectedType === type 
                    ? 'border-primary-500 bg-primary-50 text-primary-700' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex flex-col items-center">
                  {icon}
                  <span className="mt-2 text-sm font-medium">{label}</span>
                </div>
              </button>
         ))}
       </div>
       <div>
         <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
           <FiUser className="mr-2" />
           Select User
         </label>
         <div className="relative">
           <button
             type="button"
             className="w-full input-field text-left flex items-center justify-between"
             onClick={() => setShowDropdown(!showDropdown)}
           >
             <span>{selectedRole ? mockUsers.find(u => u.email === selectedRole)?.name : 'Choose a user...'}</span>
             <FiChevronDown className={`transition-transform ${showDropdown ? 'transform rotate-180' : ''}`} />
           </button>
           
           {showDropdown && (
             <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-[500px] overflow-auto">
               {selectedType && Object.entries(roleGroups[selectedType].groups).map(([groupName, users]) => (
                 <div key={groupName}>
                   <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
                     {groupName}
                   </div>
                   {users.map(user => (
                     <button
                       key={user.email}
                       type="button"
                       className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center space-x-3"
                       onClick={() => {
                         setSelectedRole(user.email);
                         setShowDropdown(false);
                       }}
                     >
                       <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-medium">
                         {user.avatar}
                       </div>
                       <div className="min-w-0 flex-1">
                         <div className="font-medium text-gray-900">{user.name}</div>
                         <div className="text-xs text-gray-500">
                          {user.role === 'client' ? user.companyName :
                           user.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                         </div>
                       </div>
                     </button>
                   ))}
                 </div>
               ))}
             </div>
           )}
         </div>
       </div>

          <div>
            <button type="submit" className="btn btn-primary w-full">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login