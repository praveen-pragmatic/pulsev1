import { IngestConfig } from './types';

export const DEFAULT_CONFIG: IngestConfig = {
  allowedFileTypes: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/csv',
    'image/jpeg',
    'image/png',
    'application/zip',
    'application/x-zip-compressed'
  ],
  maxFileSize: 100 * 1024 * 1024, // 100MB
  maxConcurrentUploads: 3
};