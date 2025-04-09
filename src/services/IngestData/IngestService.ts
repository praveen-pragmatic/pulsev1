import { S3Client } from '@aws-sdk/client-s3';
import { DEFAULT_CONFIG } from './config';
import { validateFile } from './validation';
import { calculateProgress, generateFileKey, extractMetadata } from './utils';
import { uploadFileToS3 } from '../../utils/s3';
import type { 
  IngestConfig, 
  IngestOptions, 
  IngestResult, 
  UploadProgress 
} from './types';

export class IngestService {
  private config: IngestConfig;
  private s3Client: S3Client;
  private uploadQueue: Map<string, Promise<IngestResult>>;

  constructor(
    s3Client: S3Client,
    config: Partial<IngestConfig> = {}
  ) {
    this.s3Client = s3Client;
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.uploadQueue = new Map();
  }

  async ingestFile(
    file: File,
    clientId: string,
    options: IngestOptions = {},
    onProgress?: (progress: UploadProgress) => void
  ): Promise<IngestResult> {
    try {
      // Validate file
      validateFile(file, this.config);

      // Extract metadata
      const metadata = await extractMetadata(file);

      // Generate unique key
      const key = generateFileKey(clientId, file);

      // Queue upload if too many concurrent uploads
      while (this.uploadQueue.size >= this.config.maxConcurrentUploads) {
        await Promise.race(this.uploadQueue.values());
      }

      // Start upload
      const uploadPromise = this.processUpload(file, clientId, key, metadata, options, onProgress);
      this.uploadQueue.set(key, uploadPromise);

      // Wait for upload to complete
      const result = await uploadPromise;
      this.uploadQueue.delete(key);

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      return {
        id: Date.now(),
        name: file.name,
        type: file.type,
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        status: 'error',
        timestamp: new Date().toISOString(),
        error: errorMessage
      };
    }
  }

  private async processUpload(
    file: File,
    clientId: string,
    key: string,
    metadata: Record<string, any>,
    options: IngestOptions,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<IngestResult> {
    // Upload to S3
    const uploadResult = await uploadFileToS3(file, clientId);

    // Create result object
    const result: IngestResult = {
      ...uploadResult,
      metadata,
      processingStatus: options.processImmediately ? 'processing' : 'queued'
    };

    // Process file if requested
    if (options.processImmediately) {
      try {
        // Add processing logic here
        result.processingStatus = 'completed';
      } catch (error) {
        result.processingStatus = 'failed';
        result.error = error instanceof Error ? error.message : 'Processing failed';
      }
    }

    return result;
  }

  getConfig(): IngestConfig {
    return { ...this.config };
  }

  updateConfig(newConfig: Partial<IngestConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }
}