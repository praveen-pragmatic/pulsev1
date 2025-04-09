import { beforeAll, afterAll, vi } from 'vitest';
import { mockClient } from 'aws-sdk-mock';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

beforeAll(() => {
  vi.mock('@aws-sdk/client-s3', () => ({
    S3Client: vi.fn(),
    PutObjectCommand: vi.fn(),
    ListBucketsCommand: vi.fn()
  }));
  
  vi.mock('@aws-sdk/s3-request-presigner', () => ({
    getSignedUrl: vi.fn().mockResolvedValue('https://mock-signed-url.com')
  }));
  
  // Mock fetch globally
  global.fetch = vi.fn();
});

afterAll(() => {
  mockClient.restore();
  vi.restoreAllMocks();
  
  // Clean up global fetch mock
  delete (global as any).fetch;
});