// PropertyPage MY - Template Processing Utilities

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase/config';
import { User, PropertyListingData } from './types';

/**
 * Process HTML template and replace all PLACEHOLDER_* variables with actual data
 */
export function processTemplate(
  templateHTML: string,
  userData: User,
  formData: PropertyListingData,
  imageURLs: string[]
): string {
  let html = templateHTML;

  // Replace agent placeholders
  html = html.replace(/PLACEHOLDER_AGENT_NAME/g, userData.agentName || userData.name || 'Agent');
  html = html.replace(/PLACEHOLDER_AGENT_PHOTO/g, userData.photoURL || 'https://via.placeholder.com/200');
  html = html.replace(/PLACEHOLDER_LICENSE/g, userData.license || 'Not Specified');
  html = html.replace(/PLACEHOLDER_YEARS_EXP/g, String(userData.yearsExperience || 0));
  html = html.replace(/PLACEHOLDER_PHONE/g, userData.phone || '');
  html = html.replace(/PLACEHOLDER_EMAIL/g, userData.email || '');

  // Replace property placeholders
  html = html.replace(/PLACEHOLDER_PROPERTY_NAME/g, formData.propertyName);
  html = html.replace(/PLACEHOLDER_PRICE/g, formData.price.toLocaleString());
  html = html.replace(/PLACEHOLDER_BEDS/g, String(formData.bedrooms));
  html = html.replace(/PLACEHOLDER_BATHS/g, String(formData.bathrooms));
  html = html.replace(/PLACEHOLDER_SQFT/g, formData.sqft.toLocaleString());
  html = html.replace(/PLACEHOLDER_LOCATION/g, formData.location);
  html = html.replace(/PLACEHOLDER_DESCRIPTION/g, formData.description);

  // Replace feature placeholders
  formData.features.forEach((feature, index) => {
    html = html.replace(`PLACEHOLDER_FEATURE_${index + 1}`, feature);
  });

  // Replace amenity placeholders
  formData.amenities.forEach((amenity, index) => {
    html = html.replace(`PLACEHOLDER_AMENITY_${index + 1}`, amenity);
  });

  // Replace image placeholders
  imageURLs.forEach((url, index) => {
    html = html.replace(`PLACEHOLDER_IMAGE_${index + 1}`, url);
  });
  html = html.replace(/PLACEHOLDER_HERO_IMAGE/g, imageURLs[0] || 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1920&q=80');

  return html;
}

/**
 * Generate unique URL slug for the landing page
 * Format: agent-name-property-name-randomid
 */
export function generateSlug(agentName: string, propertyName: string): string {
  const agentSlug = agentName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const propertySlug = propertyName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const randomId = Math.random().toString(36).substring(2, 8);

  return `${agentSlug}-${propertySlug}-${randomId}`;
}

/**
 * Upload images to Firebase Storage and return download URLs
 */
export async function uploadImages(
  files: File[],
  userId: string,
  pageId: string
): Promise<string[]> {
  const uploadPromises = files.map(async (file, index) => {
    const timestamp = Date.now();
    const storageRef = ref(
      storage,
      `users/${userId}/property-images/${pageId}/${timestamp}_${index}_${file.name}`
    );

    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  });

  return await Promise.all(uploadPromises);
}

/**
 * Upload single image (e.g., agent profile photo)
 */
export async function uploadSingleImage(
  file: File,
  userId: string,
  folder: string = 'profile-photos'
): Promise<string> {
  const timestamp = Date.now();
  const storageRef = ref(
    storage,
    `users/${userId}/${folder}/${timestamp}_${file.name}`
  );

  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
}

/**
 * Format phone number for WhatsApp (remove non-digits, ensure starts with country code)
 */
export function formatPhoneForWhatsApp(phone: string): string {
  // Remove all non-digit characters
  let digits = phone.replace(/\D/g, '');

  // If doesn't start with country code, assume Malaysia (60)
  if (!digits.startsWith('60')) {
    // Remove leading 0 if present
    if (digits.startsWith('0')) {
      digits = digits.substring(1);
    }
    digits = '60' + digits;
  }

  return digits;
}

/**
 * Validate form data for property listing
 */
export function validatePropertyListingData(data: Partial<PropertyListingData>): {
  valid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!data.propertyName || data.propertyName.trim() === '') {
    errors.propertyName = 'Property name is required';
  }

  if (!data.price || data.price <= 0) {
    errors.price = 'Valid price is required';
  }

  if (!data.bedrooms || data.bedrooms < 0) {
    errors.bedrooms = 'Number of bedrooms is required';
  }

  if (!data.bathrooms || data.bathrooms < 0) {
    errors.bathrooms = 'Number of bathrooms is required';
  }

  if (!data.sqft || data.sqft <= 0) {
    errors.sqft = 'Square feet is required';
  }

  if (!data.location || data.location.trim() === '') {
    errors.location = 'Location is required';
  }

  if (!data.description || data.description.trim().length < 50) {
    errors.description = 'Description must be at least 50 characters';
  }

  if (!data.features || data.features.length < 6) {
    errors.features = 'Please provide 6 property features';
  }

  if (!data.amenities || data.amenities.length < 3) {
    errors.amenities = 'Please provide 3 nearby amenities';
  }

  if (!data.images || data.images.length < 6) {
    errors.images = 'Please upload 6 property images';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
