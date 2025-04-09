import React from 'react';
import { FiFileText } from 'react-icons/fi';

export const RfpList = ({ rfps, onSelect }) => {
  if (!rfps.length) {
    return (
      <div className="text-center py-8">
        <FiFileText className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No RFPs Available</h3>
        <p className="mt-1 text-sm text-gray-500">
          No RFPs have been submitted yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {rfps.map(rfp => (
        <div key={rfp.id} className="border rounded-lg p-4">
          <h3 className="font-medium">{rfp.title}</h3>
          <p className="text-sm text-gray-500">{rfp.clientName}</p>
          <button
            onClick={() => onSelect(rfp)}
            className="mt-2 text-primary-600 hover:text-primary-800"
          >
            View Details →
          </button>
        </div>
      ))}
    </div>
  );
};