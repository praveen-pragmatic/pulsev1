# IngestData Service

A comprehensive service for handling document ingestion and processing in the application.

## Features

- File validation (type, size)
- Concurrent upload management
- Progress tracking
- Metadata extraction
- S3 integration
- Queue management
- Error handling

## Usage

```typescript
import { IngestService } from './services/IngestData';
import { s3Client } from './utils/s3';

// Create service instance
const ingestService = new IngestService(s3Client);

// Upload file
const result = await ingestService.ingestFile(
  file,
  clientId,
  {
    processImmediately: true,
    customMetadata: {
      department: 'finance',
      category: 'reports'
    }
  },
  (progress) => {
    console.log(`Upload progress: ${progress.percentage}%`);
  }
);
```

## Configuration

You can customize the service behavior by passing configuration options:

```typescript
const config = {
  allowedFileTypes: ['application/pdf', 'image/jpeg'],
  maxFileSize: 50 * 1024 * 1024, // 50MB
  maxConcurrentUploads: 5
};

const ingestService = new IngestService(s3Client, config);
```