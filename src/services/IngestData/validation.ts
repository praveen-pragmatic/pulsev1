import { IngestConfig } from './types';

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export const validateFile = (file: File, config: IngestConfig): void => {
  if (!config.allowedFileTypes.includes(file.type)) {
    throw new ValidationError(`File type ${file.type} is not allowed`);
  }

  if (file.size > config.maxFileSize) {
    throw new ValidationError(
      `File size ${(file.size / 1024 / 1024).toFixed(1)}MB exceeds maximum allowed size of ${
        config.maxFileSize / 1024 / 1024
      }MB`
    );
  }
};