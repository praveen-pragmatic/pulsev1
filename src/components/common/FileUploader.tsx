import React from 'react';
import { FiUpload, FiCloud } from 'react-icons/fi';

interface FileUploaderProps {
  onUpload: (files: FileList) => void;
  uploading: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onUpload, uploading }) => {
  const handleUpload = () => {
    document.getElementById('file-upload')?.click();
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
      <FiUpload className="h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Files</h3>
      <p className="text-sm text-gray-500 text-center mb-4">
        Drag and drop files here or click to browse
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          id="file-upload"
          type="file"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && onUpload(e.target.files)}
        />
        <button 
          onClick={handleUpload}
          disabled={uploading}
          className="btn btn-primary"
        >
          {uploading ? 'Uploading...' : 'Select Files'}
        </button>
        <button
          onClick={() => window.open('https://dataingestagent-s3.lovable.app/', '_blank')}
          className="btn btn-primary flex items-center"
        >
          <FiCloud className="mr-2" /> AWS S3 Secure Data Store
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Supports PDF, Excel, CSV, and ZIP files up to 100MB
      </p>
    </div>
  );
};