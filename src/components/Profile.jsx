import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiLock, FiSave, FiFolder, FiBook, FiFileText } from 'react-icons/fi';
import { useAuth } from '../auth/AuthContext';
import useStore from '../store/store';

const STORAGE_KEY = 'engagement_submissions';

const knowledgeFolders = [
  {
    name: 'Capital Markets',
    icon: <FiFolder className="text-blue-500" />,
    documents: ['Trading Systems', 'Market Infrastructure', 'Risk Management']
  },
  {
    name: 'Wealth Management',
    icon: <FiFolder className="text-green-500" />,
    documents: ['Portfolio Management', 'Client Advisory', 'Investment Products']
  },
  {
    name: 'NBFC',
    icon: <FiFolder className="text-purple-500" />,
    documents: ['Lending Operations', 'Risk Assessment', 'Regulatory Compliance']
  },
  {
    name: 'Insurance',
    icon: <FiFolder className="text-red-500" />,
    documents: ['Claims Processing', 'Underwriting', 'Policy Management']
  },
  {
    name: 'Banking',
    icon: <FiFolder className="text-yellow-500" />,
    documents: ['Core Banking', 'Digital Banking', 'Treasury Operations']
  },
  {
    name: 'Payments',
    icon: <FiFolder className="text-indigo-500" />,
    documents: ['Payment Systems', 'Settlement', 'Digital Wallets']
  },
  {
    name: 'Financial Services',
    icon: <FiFolder className="text-cyan-500" />,
    documents: ['KYC/AML', 'Regulatory Framework', 'Risk Management']
  },
  {
    name: 'Lending',
    icon: <FiFolder className="text-orange-500" />,
    documents: ['Credit Assessment', 'Loan Processing', 'Collections']
  },
  {
    name: 'Alternate Finance',
    icon: <FiFolder className="text-emerald-500" />,
    documents: ['P2P Lending', 'Crowdfunding', 'Digital Assets']
  }
];

const Profile = () => {
  const { currentUser } = useAuth();
  const transformItems = useStore((state) => state.transformItems);
  const [selectedEngagement, setSelectedEngagement] = useState(null);
  const [engagements, setEngagements] = useState([]);
  
  React.useEffect(() => {
    const savedSubmissions = localStorage.getItem(STORAGE_KEY);
    if (savedSubmissions) {
      setEngagements(JSON.parse(savedSubmissions));
    }
  }, []);

  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: currentUser.phone || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile update logic here
    alert('Profile updated successfully!');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-2xl font-bold mr-4">
            {currentUser.avatar}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{currentUser.name}</h2>
            <p className="text-gray-600">{currentUser.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="text-gray-400" />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiPhone className="text-gray-400" />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="input-field pl-10"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Current Password</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="input-field pl-10"
                    placeholder="Enter current password"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="input-field pl-10"
                    placeholder="Enter new password"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input-field pl-10"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="btn btn-primary flex items-center">
              <FiSave className="mr-2" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
      
      {/* Client Engagements Section */}
      {currentUser.role === 'client' && (
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <FiFolder className="h-6 w-6 text-primary-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">Project Engagements</h2>
            </div>
            {selectedEngagement && (
              <button
                onClick={() => setSelectedEngagement(null)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Back to Projects
              </button>
            )}
          </div>
          
          {!selectedEngagement ? (
            <div className="space-y-4">
            {engagements.map((engagement) => (
              <div 
                key={engagement.id} 
                className="border rounded-lg p-4 cursor-pointer transition-colors hover:border-primary-200"
                onClick={() => setSelectedEngagement(engagement)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{engagement.data.projectName}</h3>
                    <p className="text-sm text-gray-500">
                      {engagement.data.startDate} to {engagement.data.endDate}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(engagement.timestamp).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
            
            {engagements.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No project engagements found
              </div>
            )}
          </div>
          ) : (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Transform Requirements</h3>
              <div className="space-y-4">
                {(transformItems[currentUser?.clientId] || []).map((item) => (
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
                    </div>
                  </div>
                ))}
                
                {(!transformItems[currentUser?.clientId] || transformItems[currentUser?.clientId].length === 0) && (
                  <div className="text-center py-8 text-gray-500">
                    No transform requirements found for this project
                  </div>
                )}
              </div>
            </div>
          )}
          </div>
      )}
      
      {/* Knowledge Central Section - Only show for internal users */}
      {currentUser.role !== 'client' && currentUser.role !== 'partner' && (
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <div className="flex items-center mb-6">
            <FiBook className="h-6 w-6 text-primary-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Pragmatic Knowledge Central</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {knowledgeFolders.map((folder) => (
              <div key={folder.name} className="border rounded-lg p-4 hover:border-primary-300 transition-colors">
                <div className="flex items-center mb-4">
                  {folder.icon}
                  <h3 className="text-lg font-medium text-gray-900 ml-2">{folder.name}</h3>
                </div>
                
                <ul className="space-y-2">
                  {folder.documents.map((doc) => (
                    <li key={doc} className="flex items-center text-sm text-gray-600 hover:text-primary-600 cursor-pointer">
                      <FiFileText className="h-4 w-4 mr-2" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Access</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="btn btn-secondary text-sm">Best Practices</button>
              <button className="btn btn-secondary text-sm">Governance</button>
              <button className="btn btn-secondary text-sm">Project Templates</button>
              <button className="btn btn-secondary text-sm">Policies</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;