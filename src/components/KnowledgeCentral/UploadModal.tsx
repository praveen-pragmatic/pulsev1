import React from 'react';
import { FiUpload } from 'react-icons/fi';

interface UploadModalProps {
  selectedCategory: string;
  selectedDocument: string;
  onClose: () => void;
  onDocumentChange: (doc: string) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  selectedCategory,
  selectedDocument,
  onClose,
  onDocumentChange
}) => (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 max-w-lg w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">
          Upload {selectedCategory} {selectedDocument ? `- ${selectedDocument}` : ''} Document
        </h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-500">×</button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Document Title</label>
          <input 
            type="text" 
            className="input-field mt-1" 
            placeholder="Enter document title"
            value={selectedDocument}
            onChange={(e) => onDocumentChange(e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            type="text"
            className="input-field mt-1"
            value={selectedCategory}
            disabled
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Document Type</label>
          <select className="input-field mt-1">
            <option value="best-practice">Best Practice</option>
            <option value="policy">Policy</option>
            <option value="template">Template</option>
            <option value="guide">Guide</option>
            <option value="framework">Framework</option>
            <option value="metrics">Metrics & KPIs</option>
            <option value="process">Process Documentation</option>
            <option value="strategy">Strategy Document</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">File</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <div className="flex items-center justify-center">
                <FiUpload className="h-12 w-12 text-gray-400" />
                <div className="ml-3 text-left">
                  <p className="text-sm font-medium text-gray-900">{selectedCategory}</p>
                  <p className="text-xs text-gray-500">
                    Upload documents for {selectedCategory}
                    {selectedDocument && ` - ${selectedDocument}`}
                  </p>
                </div>
              </div>
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500">
                  <span>Upload a file</span>
                  <input type="file" className="sr-only" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PDF, Word, Excel up to 10MB</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end space-x-3">
        <button onClick={onClose} className="btn btn-secondary">
          Cancel
        </button>
        <button className="btn btn-primary">
          Upload to {selectedCategory}
        </button>
      </div>
    </div>
  </div>
);