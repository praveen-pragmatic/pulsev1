import React from 'react';
import { FiFileText } from 'react-icons/fi';
import { KnowledgeFolder } from '../../types';

interface FolderGridProps {
  folders: KnowledgeFolder[];
  onFolderClick: (folder: KnowledgeFolder) => void;
  onDocumentClick: (folder: KnowledgeFolder, doc: string) => void;
  onAltDataClick: (folder: KnowledgeFolder) => void;
}

export const FolderGrid: React.FC<FolderGridProps> = ({
  folders,
  onFolderClick,
  onDocumentClick,
  onAltDataClick
}) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {folders.map((folder) => (
      <div 
        key={folder.name} 
        className="border rounded-lg p-4 hover:border-primary-300 transition-colors cursor-pointer"
        onClick={() => onFolderClick(folder)}
      >
        <div className="flex items-center mb-4">
          {folder.icon}
          <h3 className="text-lg font-medium text-gray-900 ml-2">{folder.name}</h3>
          {folder.categories && (
            <span className="ml-2 text-sm text-gray-500">
              ({Object.keys(folder.categories).length} categories)
            </span>
          )}
        </div>
        
        {folder.documents ? (
          <ul className="space-y-2">
            {folder.documents.map((doc) => (
              <li key={doc} className="flex items-center text-sm text-gray-600 hover:text-primary-600">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDocumentClick(folder, doc);
                  }}
                  className="flex items-center w-full hover:text-primary-600"
                >
                  <FiFileText className="h-4 w-4 mr-2" />
                  {doc}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAltDataClick(folder);
            }}
            className="w-full text-left text-sm text-primary-600 hover:text-primary-800"
          >
            View all categories →
          </button>
        )}
      </div>
    ))}
  </div>
);