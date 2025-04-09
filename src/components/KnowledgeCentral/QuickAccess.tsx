import React from 'react';

export const QuickAccess: React.FC = () => (
  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
    <h4 className="text-sm font-medium text-gray-700 mb-2">Quick Access</h4>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <button className="btn btn-secondary text-sm">Best Practices</button>
      <button className="btn btn-secondary text-sm">Governance</button>
      <button className="btn btn-secondary text-sm">Project Templates</button>
      <button className="btn btn-secondary text-sm">Policies</button>
    </div>
  </div>
);