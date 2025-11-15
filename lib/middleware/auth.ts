import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb, adminApp } from '@/lib/firebase/admin';

// Use the already initialized Firebase Admin
const auth = adminAuth;
const db = adminDb;

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    uid: string;
    email: string;
    role?: string;
  };
}

export async function authenticateRequest(request: NextRequest): Promise<NextResponse | null> {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization token required' },
        { status: 401 }
      );
    }

    const token = authHeader.split('Bearer ')[1];

    // Verify the Firebase ID token
    const decodedToken = await auth.verifyIdToken(token);

    if (!decodedToken.uid) {
      return NextResponse.json(
        { error: 'Invalid authentication token' },
        { status: 401 }
      );
    }

    // Get additional user data from Firestore
    const userDoc = await db.collection('users').doc(decodedToken.uid).get();

    if (!userDoc.exists) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 401 }
      );
    }

    const userData = userDoc.data();

    // Add user info to request for downstream use
    (request as any).user = {
      uid: decodedToken.uid,
      email: decodedToken.email || '',
      role: userData?.role || 'user'
    };

    return null; // Continue with the request

  } catch (error) {
    console.error('Authentication error:', error);

    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    );
  }
}

export function checkResourceOwnership(userId: string, resourceUserId: string): boolean {
  return userId === resourceUserId;
}

export async function validatePageOwnership(request: NextRequest, pageId: string): Promise<NextResponse | null> {
  const user = (request as AuthenticatedRequest).user;

  if (!user) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  try {
    const pageDoc = await db.collection('pages').doc(pageId).get();

    if (!pageDoc.exists) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      );
    }

    const pageData = pageDoc.data();

    if (pageData?.userId !== user.uid) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    return null; // User owns the resource

  } catch (error) {
    console.error('Error validating page ownership:', error);
    return NextResponse.json(
      { error: 'Failed to validate resource ownership' },
      { status: 500 }
    );
  }
}

export async function validateSiteOwnership(request: NextRequest, siteId: string): Promise<NextResponse | null> {
  const user = (request as AuthenticatedRequest).user;

  if (!user) {
    return NextResponse.json(
      { error: 'Authentication required' },
      { status: 401 }
    );
  }

  try {
    const siteDoc = await db.collection('sites').doc(siteId).get();

    if (!siteDoc.exists) {
      return NextResponse.json(
        { error: 'Site not found' },
        { status: 404 }
      );
    }

    const siteData = siteDoc.data();

    if (siteData?.userId !== user.uid) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    return null; // User owns the resource

  } catch (error) {
    console.error('Error validating site ownership:', error);
    return NextResponse.json(
      { error: 'Failed to validate resource ownership' },
      { status: 500 }
    );
  }
}