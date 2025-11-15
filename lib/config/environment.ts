/**
 * Environment variable utilities with safe fallbacks for Cloud Functions
 */

// Import Firebase functions config for server environment
let functionsConfig: any = null;

// Only try to load Firebase functions config on server side
if (typeof window === 'undefined') {
  try {
    // Try to load Firebase functions config (available in Cloud Functions)
    if (typeof process !== 'undefined' && process.env.FUNCTIONS_EMULATOR === 'true') {
      // In emulator, functions.config() might not be available
      functionsConfig = {};
    } else if (typeof require !== 'undefined') {
      try {
        // In Cloud Functions environment
        const functions = require('firebase-functions');
        functionsConfig = functions.config();
      } catch (error) {
        // Not in Firebase Functions environment
        functionsConfig = {};
      }
    }
  } catch (error) {
    functionsConfig = {};
  }
}

/**
 * Get environment variable from multiple sources with fallback
 */
export function getEnvVar(key: string, fallback?: string): string {
  // Priority: 1. process.env 2. Firebase functions config 3. fallback
  let value = process.env[key];

  if (!value && functionsConfig) {
    // Map environment keys to Firebase config paths
    const configMap: Record<string, string> = {
      'GEMINI_API_KEY': 'gemini.api_key',
      'NEXT_PUBLIC_FIREBASE_API_KEY': 'app_config.api_key',
      'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN': 'app_config.auth_domain',
      'NEXT_PUBLIC_FIREBASE_PROJECT_ID': 'app_config.project_id',
      'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET': 'app_config.storage_bucket',
      'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID': 'app_config.messaging_sender_id',
      'NEXT_PUBLIC_FIREBASE_APP_ID': 'app_config.app_id',
      'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID': 'app_config.measurement_id',
      'NEXT_PUBLIC_APP_URL': 'app.url',
      'NEXT_PUBLIC_BASE_DOMAIN': 'app.base_domain',
      'NEXT_PUBLIC_WHATSAPP_DEFAULT_NUMBER': 'whatsapp.default_number',
    };

    const configPath = configMap[key];
    if (configPath && getNestedValue(functionsConfig, configPath)) {
      value = getNestedValue(functionsConfig, configPath);
    }
  }

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
 * Get nested value from object using dot notation
 */
function getNestedValue(obj: any, path: string): string {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

/**
 * Get optional environment variable with fallback
 */
export function getOptionalEnvVar(key: string, fallback: string = ''): string {
  return getEnvVar(key, fallback);
}

/**
 * Environment configuration with safe defaults
 */
export const envConfig = {
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

  // External APIs
  apis: {
    gemini: getOptionalEnvVar('GEMINI_API_KEY', ''),
    billplz: {
      apiKey: getOptionalEnvVar('BILLPLZ_API_KEY', ''),
      collectionId: getOptionalEnvVar('BILLPLZ_COLLECTION_ID', ''),
      xSignatureKey: getOptionalEnvVar('BILLPLZ_X_SIGNATURE_KEY', ''),
    },
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

/**
 * Check if all required environment variables are set
 */
export function validateEnvironment(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check required Firebase variables
  const requiredFirebaseVars = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_APP_ID',
  ];

  for (const varName of requiredFirebaseVars) {
    if (!process.env[varName]) {
      errors.push(`Missing required Firebase environment variable: ${varName}`);
    }
  }

  // Check optional but recommended variables
  if (!process.env.GEMINI_API_KEY) {
    console.warn('Gemini API key not set - AI features will be disabled');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}