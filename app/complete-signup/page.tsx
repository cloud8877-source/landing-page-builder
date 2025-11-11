'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { loadDemoData, hasDemoDataToConvert, disableDemoMode } from '@/lib/demo-mode';
import { LandingPage } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Loader2 } from 'lucide-react';

/**
 * Complete Signup Page
 * Shown after user signs up from demo mode
 * Automatically converts their demo landing page to a real one
 */
export default function CompleteSignupPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [status, setStatus] = useState<'checking' | 'converting' | 'success' | 'no-data'>('checking');
  const [publishedUrl, setPublishedUrl] = useState<string>('');

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push('/login');
      return;
    }

    // Check if there's demo data to convert
    if (!hasDemoDataToConvert()) {
      setStatus('no-data');
      // Redirect to dashboard after 2 seconds
      setTimeout(() => router.push('/dashboard'), 2000);
      return;
    }

    // Convert demo data to real landing page
    convertDemoToReal();
  }, [user, loading, router]);

  const convertDemoToReal = async () => {
    if (!user) return;

    setStatus('converting');

    try {
      const demoData = loadDemoData();
      if (!demoData) {
        setStatus('no-data');
        return;
      }

      // Create landing page document
      const landingPageData: Partial<LandingPage> = {
        userId: user.id,
        templateId: demoData.templateId,
        pageTitle: demoData.pageTitle,
        agentInfo: demoData.agentInfo,
        branding: demoData.branding,
        properties: demoData.properties,
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
      };

      // Add to Firestore
      const docRef = await addDoc(collection(db, 'landingPages'), {
        ...landingPageData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      // Generate published URL
      const url = `${window.location.origin}/page/${docRef.id}`;
      setPublishedUrl(url);

      // Clear demo mode
      disableDemoMode();

      setStatus('success');

      // Auto-redirect to dashboard after 5 seconds
      setTimeout(() => router.push('/dashboard'), 5000);
    } catch (error) {
      console.error('Error converting demo data:', error);
      alert('Error publishing your landing page. Please try again from the dashboard.');
      router.push('/dashboard');
    }
  };

  if (loading || status === 'checking') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Checking for saved work...</p>
        </div>
      </div>
    );
  }

  if (status === 'converting') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg font-medium mb-2">Publishing your landing page...</p>
          <p className="text-sm text-muted-foreground">This will only take a moment</p>
        </div>
      </div>
    );
  }

  if (status === 'no-data') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md p-8 text-center">
          <p className="text-muted-foreground">No saved work found. Redirecting to dashboard...</p>
        </Card>
      </div>
    );
  }

  // Success state
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="max-w-2xl w-full p-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          <h1 className="text-3xl font-bold mb-4">🎉 Your Landing Page is Live!</h1>
          <p className="text-lg text-gray-600 mb-8">
            We've successfully published your landing page. Share it with your clients now!
          </p>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <p className="text-sm text-gray-600 mb-2">Your landing page URL:</p>
            <div className="flex items-center gap-2 mb-4">
              <input
                type="text"
                value={publishedUrl}
                readOnly
                className="flex-1 px-4 py-3 border rounded-lg bg-white"
              />
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(publishedUrl);
                  alert('URL copied to clipboard!');
                }}
              >
                Copy
              </Button>
            </div>
            <a
              href={publishedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              Open in new tab →
            </a>
          </div>

          <div className="space-y-3">
            <Button
              size="lg"
              className="w-full"
              onClick={() => router.push('/dashboard')}
            >
              Go to Dashboard
            </Button>
            <p className="text-sm text-gray-500">
              Redirecting automatically in 5 seconds...
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
