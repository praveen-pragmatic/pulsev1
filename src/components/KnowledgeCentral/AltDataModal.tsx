import React from 'react';
import { FiFileText } from 'react-icons/fi';
import { KnowledgeFolder } from '../../types';

interface AltDataModalProps {
  data: KnowledgeFolder;
  onClose: () => void;
}

export const AltDataModal: React.FC<AltDataModalProps> = ({ data, onClose }) => (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 max-w-lg w-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">{data.name}</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">×</button>
      </div>
      <div className="space-y-4 max-h-[70vh] overflow-y-auto">
        {Object.entries(data.categories || {}).map(([category, { all }]) => (
          <div key={category} className="border rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">{category}</h4>
            <ul className="space-y-2">
              {all.map((item) => (
                <li key={item} className="flex items-center text-sm text-gray-600">
                  <FiFileText className="h-4 w-4 mr-2 text-gray-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </div>
);