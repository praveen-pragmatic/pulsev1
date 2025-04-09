import React, { useState } from 'react';
import { FiBook, FiSearch, FiUpload } from 'react-icons/fi';
import { KnowledgeFolder } from '../../types';
import { SearchBar } from './SearchBar';
import { FolderGrid } from './FolderGrid';
import { QuickAccess } from './QuickAccess';
import { UploadModal } from './UploadModal';
import { AltDataModal } from './AltDataModal';
import { knowledgeFolders } from '../../constants/knowledgeFolders';

export const KnowledgeCentral: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<KnowledgeFolder | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDocument, setSelectedDocument] = useState('');
  const [selectedAltData, setSelectedAltData] = useState<KnowledgeFolder | null>(null);

  const filteredFolders = knowledgeFolders.filter(folder =>
    folder.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (folder.documents ? 
      folder.documents.some(doc => doc.toLowerCase().includes(searchQuery.toLowerCase())) :
      Object.values(folder.categories || {}).some(cat => 
        cat.all.some(doc => doc.toLowerCase().includes(searchQuery.toLowerCase()))
      ))
  );

  const handleFolderClick = (folder: KnowledgeFolder) => {
    setSelectedCategory(folder.name);
    setSelectedDocument('');
    setShowUploadForm(true);
  };

  const handleDocumentClick = (folder: KnowledgeFolder, doc: string) => {
    setSelectedCategory(folder.name);
    setSelectedDocument(doc);
    setShowUploadForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <FiBook className="h-6 w-6 text-primary-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-900">Pragmatic Knowledge Central</h2>
          </div>
          <div className="flex space-x-4">
            <SearchBar 
              value={searchQuery}
              onChange={setSearchQuery}
            />
            <button 
              onClick={() => setShowUploadForm(true)}
              className="btn btn-primary flex items-center"
            >
              <FiUpload className="mr-2" /> Upload Document
            </button>
          </div>
        </div>

        {/* Folder Grid */}
        <FolderGrid
          folders={filteredFolders}
          onFolderClick={handleFolderClick}
          onDocumentClick={handleDocumentClick}
          onAltDataClick={setSelectedAltData}
        />

        {/* Quick Access */}
        <QuickAccess />
      </div>

      {/* Upload Modal */}
      {showUploadForm && !selectedAltData && (
        <UploadModal
          selectedCategory={selectedCategory}
          selectedDocument={selectedDocument}
          onClose={() => setShowUploadForm(false)}
          onDocumentChange={setSelectedDocument}
        />
      )}

      {/* Alt Data Modal */}
      {showUploadForm && selectedAltData && (
        <AltDataModal
          data={selectedAltData}
          onClose={() => {
            setShowUploadForm(false);
            setSelectedAltData(null);
          }}
        />
      )}
    </div>
  );
};