import { FileUpload } from '../../types';

export interface IngestConfig {
  allowedFileTypes: string[];
  maxFileSize: number; // in bytes
  maxConcurrentUploads: number;
}

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface IngestResult extends FileUpload {
  metadata?: Record<string, any>;
  processingStatus?: 'queued' | 'processing' | 'completed' | 'failed';
  error?: string;
}

export interface IngestOptions {
  processImmediately?: boolean;
  customMetadata?: Record<string, any>;
  tags?: Record<string, string>;
}