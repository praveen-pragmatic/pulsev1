import { FiCheckCircle, FiClock, FiAlertTriangle } from 'react-icons/fi';
import React from 'react';

export const getStatusBadge = (status: string): JSX.Element | null => {
  switch (status) {
    case 'completed':
    case 'complete':
      return React.createElement('span', {
        className: 'px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 flex items-center'
      }, [
        React.createElement(FiCheckCircle, { className: 'mr-1', key: 'icon' }),
        'Completed'
      ]);
    case 'in_progress':
    case 'processing':
      return React.createElement('span', {
        className: 'px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 flex items-center'
      }, [
        React.createElement(FiClock, { className: 'mr-1', key: 'icon' }),
        'In Progress'
      ]);
    case 'not_started':
    case 'pending':
      return React.createElement('span', {
        className: 'px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 flex items-center'
      }, 'Not Started');
    case 'error':
      return React.createElement('span', {
        className: 'px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 flex items-center'
      }, [
        React.createElement(FiAlertTriangle, { className: 'mr-1', key: 'icon' }),
        'Error'
      ]);
    default:
      return null;
  }
};

export const getPriorityBadge = (priority: string): JSX.Element | null => {
  switch (priority) {
    case 'critical':
      return React.createElement('span', {
        className: 'px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 flex items-center'
      }, [
        React.createElement(FiAlertTriangle, { className: 'mr-1', key: 'icon' }),
        'Critical'
      ]);
    case 'high':
      return React.createElement('span', {
        className: 'px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800 flex items-center'
      }, 'High');
    case 'medium':
      return React.createElement('span', {
        className: 'px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 flex items-center'
      }, 'Medium');
    case 'low':
      return React.createElement('span', {
        className: 'px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 flex items-center'
      }, 'Low');
    default:
      return null;
  }
};