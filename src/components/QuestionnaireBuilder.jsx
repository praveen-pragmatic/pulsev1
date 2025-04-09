import React, { useState } from 'react';
import { FiList, FiPlus, FiEdit2, FiTrash2, FiMail, FiCheck, FiX } from 'react-icons/fi';

const QuestionnaireBuilder = () => {
  const [questionnaires, setQuestionnaires] = useState([
    {
      id: 1,
      title: 'Risk Management Assessment',
      description: 'Evaluates the maturity of risk management practices across the organization',
      questions: 15,
      department: 'Risk & Compliance',
      responses: 8,
      status: 'active'
    },
    {
      id: 2,
      title: 'Customer Service Process Review',
      description: 'Gathers insights on customer service workflows and efficiency',
      questions: 12,
      department: 'Customer Service',
      responses: 4,
      status: 'active'
    },
    {
      id: 3,
      title: 'Technology Infrastructure Survey',
      description: 'Assesses current technology capabilities and pain points',
      questions: 20,
      department: 'IT',
      responses: 0,
      status: 'draft'
    },
    {
      id: 4,
      title: 'Share Transfer Operations Assessment',
      description: 'Evaluates efficiency and compliance of share transfer processes',
      questions: 18,
      department: 'Operations',
      responses: 3,
      status: 'active'
    }
  ]);
  
  const [recipients, setRecipients] = useState([
    { id: 1, name: 'John Smith', email: 'john.smith@abcfinancial.com', department: 'Risk Management', status: 'completed' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.j@abcfinancial.com', department: 'Customer Service', status: 'pending' },
    { id: 3, name: 'Michael Wong', email: 'michael.w@abcfinancial.com', department: 'IT', status: 'in_progress' },
    { id: 4, name: 'Emma Garcia', email: 'emma.g@abcfinancial.com', department: 'Finance', status: 'not_sent' },
    { id: 5, name: 'Dinesh Shetty', email: 'd.shetty@integratedindia.com', department: 'Operations', status: 'in_progress' },
    { id: 6, name: 'M Krishna', email: 'm.krishna@integratedindia.com', department: 'Management', status: 'pending' }
  ]);
  
  const [showNewQuestionnaireModal, setShowNewQuestionnaireModal] = useState(false);
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span>;
      case 'draft':
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Draft</span>;
      case 'completed':
        return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 flex items-center"><FiCheck className="mr-1" /> Completed</span>;
      case 'pending':
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
      case 'in_progress':
        return <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">In Progress</span>;
      case 'not_sent':
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Not Sent</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Questionnaires</h2>
            <p className="text-gray-600">Create and manage questionnaires to gather important data from stakeholders.</p>
          </div>
          <button 
            className="btn btn-primary flex items-center"
            onClick={() => setShowNewQuestionnaireModal(true)}
          >
            <FiPlus className="mr-2" /> Create Questionnaire
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Questions</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responses</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {questionnaires.map((questionnaire) => (
                <tr key={questionnaire.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{questionnaire.title}</div>
                    <div className="text-sm text-gray-500">{questionnaire.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {questionnaire.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {questionnaire.questions}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {questionnaire.responses}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(questionnaire.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-gray-600 hover:text-gray-900">
                        <FiEdit2 className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <FiMail className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-red-600">
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Questionnaire Recipients</h3>
        <p className="text-gray-600 mb-4">Manage and track the status of questionnaire participants.</p>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recipients.map((recipient) => (
                <tr key={recipient.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {recipient.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {recipient.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {recipient.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(recipient.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <button className="text-gray-600 hover:text-gray-900">
                        <FiMail className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <FiCheck className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4">
          <button className="btn btn-secondary flex items-center">
            <FiPlus className="mr-2" /> Add Recipient
          </button>
        </div>
      </div>
      
      {/* Mock Modal for New Questionnaire */}
      {showNewQuestionnaireModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Create New Questionnaire</h3>
              <button onClick={() => setShowNewQuestionnaireModal(false)}>
                <FiX className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="input-field"
                  placeholder="Enter questionnaire title"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  rows="3"
                  className="input-field"
                  placeholder="Enter questionnaire description"
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
                  Target Department
                </label>
                <select id="department" className="input-field">
                  <option value="">Select department</option>
                  <option value="Finance">Finance</option>
                  <option value="Risk & Compliance">Risk & Compliance</option>
                  <option value="IT">IT</option>
                  <option value="Operations">Operations</option>
                  <option value="Customer Service">Customer Service</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setShowNewQuestionnaireModal(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowNewQuestionnaireModal(false)}
                className="btn btn-primary"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionnaireBuilder;