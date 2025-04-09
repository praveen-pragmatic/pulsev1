import { UploadProgress, IngestResult } from './types';

export const calculateProgress = (loaded: number, total: number): UploadProgress => ({
  loaded,
  total,
  percentage: Math.round((loaded / total) * 100)
});

export const generateFileKey = (clientId: string, file: File): string => {
  const timestamp = Date.now();
  const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  return `${clientId}/${timestamp}-${sanitizedFileName}`;
};

export const extractMetadata = async (file: File): Promise<Record<string, any>> => {
  const metadata: Record<string, any> = {
    originalName: file.name,
    size: file.size,
    type: file.type,
    lastModified: new Date(file.lastModified).toISOString()
  };

  // Add file type specific metadata extraction here
  if (file.type.startsWith('image/')) {
    const img = new Image();
    const dimensions = await new Promise<{ width: number; height: number }>((resolve) => {
      img.onload = () => resolve({ width: img.width, height: img.height });
      img.src = URL.createObjectURL(file);
    });
    metadata.dimensions = dimensions;
  }

  return metadata;
};