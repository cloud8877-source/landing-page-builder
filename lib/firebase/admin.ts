import { initializeApp, getApps, cert, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';
import { envConfig } from '../config/environment';

let adminApp: any = null;
let adminDb: any = null;
let adminAuth: any = null;
let adminStorage: any = null;

// Initialize Firebase Admin SDK with safe error handling
const apps = getApps();

if (!apps.length) {
  try {
    const projectId = envConfig.firebase.projectId;

    // Try to initialize with service account credentials
    const serviceAccountKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
    const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;

    if (serviceAccountKey && clientEmail) {
      // Production environment with service account
      const serviceAccount = {
        projectId,
        clientEmail,
        privateKey: serviceAccountKey.replace(/\\n/g, '\n'),
      };

      adminApp = initializeApp({
        credential: cert(serviceAccount as any),
        projectId,
      });
      console.log('Firebase Admin SDK initialized with service account');
    } else {
      // Development or serverless environment
      adminApp = initializeApp({
        projectId,
      }, 'admin-app');
      console.log('Firebase Admin SDK initialized in development mode');
    }
  } catch (error) {
    console.error('Failed to initialize Firebase Admin SDK:', error);

    // Ultimate fallback - create a mock admin for development
    try {
      adminApp = initializeApp({
        projectId: envConfig.firebase.projectId,
      }, 'admin-app-fallback');
      console.log('Firebase Admin SDK initialized with fallback configuration');
    } catch (fallbackError) {
      console.error('Failed to initialize Firebase Admin SDK with fallback:', fallbackError);
      throw new Error('Unable to initialize Firebase Admin SDK');
    }
  }
} else {
  adminApp = getApp(apps[0].name);
}

// Initialize services with error handling
try {
  adminDb = getFirestore(adminApp);
  adminAuth = getAuth(adminApp);
  adminStorage = getStorage(adminApp);
} catch (error) {
  console.error('Failed to initialize Firebase services:', error);
  throw new Error('Unable to initialize Firebase services');
}

export { adminApp, adminDb, adminAuth, adminStorage };

// Safe getter functions with error handling
export function getAdminDb() {
  if (!adminDb) {
    throw new Error('Firestore not initialized');
  }
  return adminDb;
}

export function getAdminAuth() {
  if (!adminAuth) {
    throw new Error('Auth not initialized');
  }
  return adminAuth;
}

export function getAdminStorage() {
  if (!adminStorage) {
    throw new Error('Storage not initialized');
  }
  return adminStorage;
}
