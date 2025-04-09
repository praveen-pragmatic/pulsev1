import React from 'react';
import { FiFolder } from 'react-icons/fi';
import { ConnectedSource } from '../../types';

interface SourceListProps {
  sources: ConnectedSource[];
  onConnect: () => void;
}

export const SourceList: React.FC<SourceListProps> = ({ sources, onConnect }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Connected Data Sources</h3>
      <div className="space-y-4">
        {sources.map(source => (
          <div key={source.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div className="flex items-center">
              <FiFolder className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <p className="font-medium text-gray-900">{source.name}</p>
                <p className="text-xs text-gray-500">Last sync: {source.lastSync}</p>
              </div>
            </div>
            <div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                source.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {source.status}
              </span>
            </div>
          </div>
        ))}
        <button 
          onClick={onConnect}
          className="btn btn-secondary w-full mt-4"
        >
          Connect New Source
        </button>
      </div>
    </div>
  );
};