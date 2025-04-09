import React, { useState, useEffect } from 'react';
import { FiPlus, FiFlag, FiClock, FiCheckCircle, FiAlertTriangle, FiUsers, FiLink, FiLayers } from 'react-icons/fi';
import useStore from '../store/store';
import { useAuth } from '../auth/AuthContext';

const ProjectManagement = () => {
  const { currentUser } = useAuth();
  const [selectedProject, setSelectedProject] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showMilestoneModal, setShowMilestoneModal] = useState(false);
  const [showRequirementModal, setShowRequirementModal] = useState(false);
  
  const {
    projects = [],
    addProject,
    updateProject,
    addTask,
    updateTask,
    addMilestone,
    updateMilestone,
    addRequirement,
    updateRequirement
  } = useStore();

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    assignee: '',
    dueDate: '',
    status: 'todo',
    dependencies: []
  });

  const [newMilestone, setNewMilestone] = useState({
    title: '',
    description: '',
    targetDate: '',
    criteria: '',
    status: 'pending'
  });

  const [newRequirement, setNewRequirement] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    status: 'draft',
    dependencies: []
  });

  const getPriorityBadge = (priority) => {
    const badges = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    return badges[priority] || badges.medium;
  };

  const getStatusBadge = (status) => {
    const badges = {
      todo: 'bg-gray-100 text-gray-800',
      'in-progress': 'bg-blue-100 text-blue-800',
      review: 'bg-purple-100 text-purple-800',
      done: 'bg-green-100 text-green-800',
      blocked: 'bg-red-100 text-red-800'
    };
    return badges[status] || badges.todo;
  };

  return (
    <div className="space-y-6">
      {/* Project Overview */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Project Management</h2>
            <p className="text-gray-600">Manage transformation projects and track progress</p>
          </div>
          <button className="btn btn-primary flex items-center">
            <FiPlus className="mr-2" /> New Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-700">Total Projects</h3>
              <span className="text-2xl font-bold text-gray-900">12</span>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-700">Active Tasks</h3>
              <span className="text-2xl font-bold text-gray-900">48</span>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-700">Milestones</h3>
              <span className="text-2xl font-bold text-gray-900">8</span>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-700">Requirements</h3>
              <span className="text-2xl font-bold text-gray-900">24</span>
            </div>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Task Board</h3>
          <div className="grid grid-cols-4 gap-4">
            {['Todo', 'In Progress', 'Review', 'Done'].map((column) => (
              <div key={column} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-4">{column}</h4>
                <div className="space-y-3">
                  {/* Sample Tasks */}
                  <div className="bg-white p-3 rounded shadow-sm">
                    <h5 className="text-sm font-medium text-gray-900">Setup Development Environment</h5>
                    <div className="flex items-center justify-between mt-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Technical</span>
                      <div className="flex items-center">
                        <FiClock className="text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">2d</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones Timeline */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Milestones</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="flex-shrink-0 w-32">
                <span className="text-sm text-gray-500">Phase 1</span>
              </div>
              <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-primary-600" style={{ width: '75%' }}></div>
              </div>
              <div className="flex-shrink-0 w-24 ml-4">
                <span className="text-sm text-gray-500">75% Complete</span>
              </div>
            </div>
          </div>
        </div>

        {/* Requirements Table */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Requirements</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">REQ-001</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">User Authentication</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Security</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">High</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Approved</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Dependencies Graph */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Dependencies</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Dependencies visualization would appear here</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectManagement;