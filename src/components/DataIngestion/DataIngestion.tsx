import React, { useState } from 'react';
import { useAuth } from '../../auth/AuthContext';
import useStore from '../../store/store';
import { FiZap } from 'react-icons/fi';
import { FileUploader } from '../common/FileUploader';
import { SourceList } from '../common/SourceList';
import { dataSources } from '../../constants/dataSources';
import { ConnectedSource } from '../../types';
import { SourceConfigModal } from './SourceConfigModal';
import { FileList } from './FileList';

const initialConnectedSources: ConnectedSource[] = [
  { id: 1, name: 'SharePoint - Finance', status: 'active', lastSync: '10 minutes ago' },
  { id: 2, name: 'Google Drive - Executive', status: 'active', lastSync: '1 hour ago' },
  { id: 3, name: 'Salesforce', status: 'inactive', lastSync: 'Never' }
];

export const DataIngestion: React.FC = () => {
  const { currentUser } = useAuth();
  const { uploadedFiles = {}, addUploadedFile } = useStore();
  const [uploading, setUploading] = useState(false);
  const [selectedSource, setSelectedSource] = useState(null);
  const [showConfigModal, setShowConfigModal] = useState(false);

  const handleFileUpload = (files: FileList) => {
    Array.from(files).forEach(file => {
      addUploadedFile(file, currentUser?.clientId);
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Data Ingestion</h2>
            <p className="text-gray-600">Upload or connect to data sources to begin the diagnostic process.</p>
          </div>
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center">
            <FiZap className="mr-2" />
            <span>Jarvis Mode: Managed</span>
          </div>
        </div>

        {/* Upload and Sources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <FileUploader onUpload={handleFileUpload} uploading={uploading} />
          <SourceList 
            sources={initialConnectedSources}
            onConnect={() => document.getElementById('integrations')?.scrollIntoView({ behavior: 'smooth' })}
          />
        </div>

        {/* File List */}
        <FileList files={uploadedFiles[currentUser?.clientId] || []} />
      </div>

      {/* Data Source Integrations */}
      <div className="bg-white rounded-lg shadow p-6" id="integrations">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Data Source Integrations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataSources.map((category) => (
            <div key={category.category} className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">{category.category}</h3>
              <div className="space-y-3">
                {category.sources.map((source) => (
                  <div key={source.name} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{source.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900">{source.name}</p>
                        <p className="text-sm text-gray-500">{source.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedSource(source);
                        setShowConfigModal(true);
                      }}
                      className="btn btn-secondary text-sm"
                    >
                      Configure
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Configuration Modal */}
      {showConfigModal && selectedSource && (
        <SourceConfigModal
          source={selectedSource}
          onClose={() => setShowConfigModal(false)}
        />
      )}
    </div>
  );
};