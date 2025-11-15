/**
 * Client-safe environment variable utilities
 * Only uses process.env which is available in both client and server
 */

/**
 * Get environment variable with fallback
 */
export function getEnvVar(key: string, fallback?: string): string {
  const value = process.env[key];

  if (value === undefined) {
    if (fallback !== undefined) {
      console.warn(`Environment variable ${key} not set, using fallback: ${fallback}`);
      return fallback;
    }

    console.error(`Required environment variable ${key} is not set`);
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

/**
 * Get optional environment variable with fallback
 */
export function getOptionalEnvVar(key: string, fallback: string = ''): string {
  return getEnvVar(key, fallback);
}

/**
 * Client-safe environment configuration
 */
export const clientEnvConfig = {
  // Firebase Configuration
  firebase: {
    apiKey: getEnvVar('NEXT_PUBLIC_FIREBASE_API_KEY'),
    authDomain: getEnvVar('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'),
    projectId: getEnvVar('NEXT_PUBLIC_FIREBASE_PROJECT_ID'),
    storageBucket: getEnvVar('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: getEnvVar('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'),
    appId: getEnvVar('NEXT_PUBLIC_FIREBASE_APP_ID'),
    measurementId: getOptionalEnvVar('NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID'),
  },

  // App Configuration
  app: {
    url: getEnvVar('NEXT_PUBLIC_APP_URL', 'http://localhost:3000'),
    baseDomain: getEnvVar('NEXT_PUBLIC_BASE_DOMAIN', 'localhost:3000'),
    nodeEnv: getOptionalEnvVar('NODE_ENV', 'development'),
  },

  // WhatsApp
  whatsapp: {
    defaultNumber: getOptionalEnvVar('NEXT_PUBLIC_WHATSAPP_DEFAULT_NUMBER', '60123456789'),
  },

  // Security
  security: {
    recaptchaSiteKey: getOptionalEnvVar('NEXT_PUBLIC_RECAPTCHA_SITE_KEY', ''),
  },
};