import { fileTypeFromBuffer } from 'file-type';
import sharp from 'sharp';

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
  fileType?: string;
  fileSize?: number;
}

export interface ProcessedImageResult {
  buffer: Buffer;
  metadata: sharp.Metadata;
  fileType: string;
}

// Allowed file types for different use cases
export const ALLOWED_IMAGE_TYPES = {
  PROFILE: ['image/jpeg', 'image/png', 'image/webp'],
  PROPERTY: ['image/jpeg', 'image/png', 'image/webp'],
  GENERAL: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
};

// Maximum file sizes (in bytes)
export const MAX_FILE_SIZES = {
  AVATAR: 2 * 1024 * 1024, // 2MB
  IMAGE: 5 * 1024 * 1024, // 5MB
  BANNER: 10 * 1024 * 1024, // 10MB
};

// Image dimensions for different use cases
export const IMAGE_DIMENSIONS = {
  AVATAR: { width: 200, height: 200 },
  THUMBNAIL: { width: 400, height: 300 },
  BANNER: { width: 1200, height: 400 },
  GALLERY: { width: 800, height: 600 },
};

/**
 * Validate uploaded file for security
 */
export async function validateFile(
  buffer: Buffer,
  fileName: string,
  allowedTypes: string[] = ALLOWED_IMAGE_TYPES.GENERAL,
  maxSize: number = MAX_FILE_SIZES.IMAGE
): Promise<FileValidationResult> {
  try {
    // Check file size
    if (buffer.length > maxSize) {
      return {
        isValid: false,
        error: `File size exceeds maximum allowed size of ${Math.round(maxSize / 1024 / 1024)}MB`,
        fileSize: buffer.length,
      };
    }

    // Detect file type from buffer (more secure than checking extension)
    const fileTypeResult = await fileTypeFromBuffer(buffer);

    if (!fileTypeResult) {
      return {
        isValid: false,
        error: 'Unable to determine file type',
      };
    }

    // Verify the file extension matches the detected type
    const detectedExtension = fileTypeResult.ext;
    const fileExtension = fileName.split('.').pop()?.toLowerCase();

    if (detectedExtension !== fileExtension) {
      return {
        isValid: false,
        error: 'File extension does not match actual file content',
      };
    }

    // Check if the file type is allowed
    if (!allowedTypes.includes(fileTypeResult.mime)) {
      return {
        isValid: false,
        error: `File type ${fileTypeResult.mime} is not allowed`,
        fileType: fileTypeResult.mime,
      };
    }

    // Additional security checks for images
    if (fileTypeResult.mime.startsWith('image/')) {
      const imageValidation = await validateImageContent(buffer);
      if (!imageValidation.isValid) {
        return imageValidation;
      }
    }

    return {
      isValid: true,
      fileType: fileTypeResult.mime,
      fileSize: buffer.length,
    };

  } catch (error) {
    return {
      isValid: false,
      error: 'Error validating file: ' + (error as Error).message,
    };
  }
}

/**
 * Validate image content for potential security issues
 */
export async function validateImageContent(buffer: Buffer): Promise<FileValidationResult> {
  try {
    const metadata = await sharp(buffer).metadata();

    // Check for reasonable image dimensions
    if (!metadata.width || !metadata.height) {
      return {
        isValid: false,
        error: 'Invalid image: missing dimensions',
      };
    }

    // Prevent extremely large images that could cause DoS
    if (metadata.width > 10000 || metadata.height > 10000) {
      return {
        isValid: false,
        error: 'Image dimensions are too large (max 10000x10000)',
      };
    }

    // Prevent extremely small images that might be suspicious
    if (metadata.width < 10 || metadata.height < 10) {
      return {
        isValid: false,
        error: 'Image dimensions are too small (min 10x10)',
      };
    }

    // Additional check for animated GIFs (can be used for DoS)
    if (metadata.format === 'gif' && metadata.pages && metadata.pages > 50) {
      return {
        isValid: false,
        error: 'Animated GIFs with more than 50 frames are not allowed',
      };
    }

    return { isValid: true };

  } catch (error) {
    return {
      isValid: false,
      error: 'Error processing image: ' + (error as Error).message,
    };
  }
}

/**
 * Process and optimize uploaded images
 */
export async function processImage(
  buffer: Buffer,
  targetDimensions: { width: number; height: number },
  quality: number = 85,
  format: 'jpeg' | 'png' | 'webp' = 'jpeg'
): Promise<ProcessedImageResult> {
  try {
    let imageProcessor = sharp(buffer);

    // Resize and crop to exact dimensions
    imageProcessor = imageProcessor
      .resize(targetDimensions.width, targetDimensions.height, {
        fit: 'cover',
        position: 'center',
      })
      .rotate(); // Auto-rotate based on EXIF

    // Apply format-specific optimizations
    switch (format) {
      case 'jpeg':
        imageProcessor = imageProcessor.jpeg({ quality, progressive: true });
        break;
      case 'png':
        imageProcessor = imageProcessor.png({ compressionLevel: 9 });
        break;
      case 'webp':
        imageProcessor = imageProcessor.webp({ quality });
        break;
    }

    const processedBuffer = await imageProcessor.toBuffer();
    const metadata = await sharp(processedBuffer).metadata();

    return {
      buffer: processedBuffer,
      metadata: metadata as sharp.Metadata,
      fileType: `image/${format}`,
    };

  } catch (error) {
    throw new Error('Error processing image: ' + (error as Error).message);
  }
}

/**
 * Generate a secure filename
 */
export function generateSecureFileName(originalName: string, userId: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split('.').pop()?.toLowerCase() || 'jpg';
  const sanitizedName = originalName
    .split('.')[0]
    .replace(/[^a-zA-Z0-9-_]/g, '_')
    .substring(0, 20);

  return `${sanitizedName}_${userId}_${timestamp}_${randomString}.${extension}`;
}

/**
 * Sanitize file path to prevent directory traversal
 */
export function sanitizeFilePath(filePath: string): string {
  return filePath
    .replace(/\.\./g, '') // Remove directory traversal attempts
    .replace(/[\\/]/g, '_') // Replace path separators
    .replace(/[^a-zA-Z0-9_\-/]/g, ''); // Remove dangerous characters
}

/**
 * Generate different sizes of an image
 */
export async function generateImageSizes(
  originalBuffer: Buffer,
  sizes: { [key: string]: { width: number; height: number } }
): Promise<{ [key: string]: ProcessedImageResult }> {
  const results: { [key: string]: ProcessedImageResult } = {};

  for (const [sizeName, dimensions] of Object.entries(sizes)) {
    try {
      const processedImage = await processImage(originalBuffer, dimensions);
      results[sizeName] = processedImage;
    } catch (error) {
      console.error(`Error processing ${sizeName} size:`, error);
      // Continue processing other sizes even if one fails
    }
  }

  return results;
}