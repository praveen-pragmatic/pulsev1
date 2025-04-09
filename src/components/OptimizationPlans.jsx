import React, { useState } from 'react';
import { FiActivity, FiClock, FiCheckCircle, FiUser } from 'react-icons/fi';
import useStore from '../store/store';
import { useAuth } from '../auth/AuthContext';
import { optimizeDB } from '../services/db';

const assignees = [
  { id: 1, name: 'Selva', role: 'Senior Analyst' },
  { id: 2, name: 'Naga', role: 'Lead Consultant' },
  { id: 3, name: 'Suresh', role: 'Project Manager' }
];

const OptimizationPlans = () => {
  const { currentUser } = useAuth();
  const optimizeItems = useStore((state) => state.optimizeItems[currentUser?.clientId] || []);
  const [assignedTo, setAssignedTo] = useState({});
  
  // Load assignments from IndexedDB on mount
  React.useEffect(() => {
    const loadAssignments = async () => {
      if (currentUser?.clientId) {
        const savedAssignments = await optimizeDB.getAssignments(currentUser.clientId);
        setAssignedTo(savedAssignments || {});
      }
    };
    loadAssignments();
  }, [currentUser?.clientId]);

  // Save assignment when changed
  const handleAssigneeChange = async (itemId, assigneeId) => {
    const newAssignments = {
      ...assignedTo,
      [itemId]: assigneeId
    };
    setAssignedTo(newAssignments);
    
    if (currentUser?.clientId) {
      await optimizeDB.saveAssignments(currentUser.clientId, newAssignments);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        {optimizeItems.length > 0 ? (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Optimization Requirements</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  {optimizeItems.length} items identified
                </span>
              </div>
            </div>
            <div className="space-y-4">
              {optimizeItems.map((item) => (
                <div key={item.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-mono text-green-600 bg-green-50 px-2 py-0.5 rounded">
                          {item.optimizeId}
                        </span>
                        <h4 className="font-medium text-gray-900">{item.title}</h4>
                      </div>
                      <div className="mt-1 flex items-center space-x-3 text-sm text-gray-500">
                        <span>Project: {item.projectName}</span>
                        <span>•</span>
                        <span>Area: {item.area}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.priority === 'high' ? 'bg-red-100 text-red-800' :
                        item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)} Priority
                      </span>
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div>
                      <h5 className="text-xs font-medium text-gray-700 uppercase">Impact</h5>
                      <p className="text-sm text-gray-600">{item.impact}</p>
                    </div>
                    <div>
                      <h5 className="text-xs font-medium text-gray-700 uppercase">Assignee</h5>
                      <select
                        className="input-field mt-1"
                        value={assignedTo[item.id] || ''}
                        onChange={(e) => handleAssigneeChange(item.id, e.target.value)}
                      >
                        <option value="">Select assignee...</option>
                        {assignees.map(assignee => (
                          <option key={assignee.id} value={assignee.id}>
                            {assignee.name} ({assignee.role})
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <h5 className="text-xs font-medium text-gray-700 uppercase">Recommendation</h5>
                      <p className="text-sm text-gray-600">{item.recommendation}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      Created {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <FiActivity className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No Optimization Items</h3>
            <p className="mt-1 text-sm text-gray-500">
              No items have been marked for optimization yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OptimizationPlans;