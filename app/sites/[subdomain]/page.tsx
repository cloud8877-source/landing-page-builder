'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Site } from '@/lib/types';

export default function SubdomainSitePage() {
  const params = useParams();
  const [site, setSite] = useState<Site | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.subdomain) {
      loadSite(params.subdomain as string);
    }
  }, [params.subdomain]);

  async function loadSite(subdomain: string) {
    try {
      const q = query(
        collection(db, 'sites'),
        where('subdomain', '==', subdomain),
        where('published', '==', true)
      );

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const siteDoc = querySnapshot.docs[0];
        const siteData = {
          id: siteDoc.id,
          ...siteDoc.data(),
          createdAt: siteDoc.data().createdAt?.toDate() || new Date(),
          updatedAt: siteDoc.data().updatedAt?.toDate() || new Date(),
        } as Site;

        setSite(siteData);
      } else {
        setError('Site not found or not published');
      }
    } catch (err) {
      console.error('Error loading site:', err);
      setError('Error loading site');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !site) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Site Not Found</h1>
          <p className="text-gray-600 mb-8">
            {error || 'This site does not exist or has not been published yet.'}
          </p>
          <a
            href={process.env.NEXT_PUBLIC_APP_URL}
            className="text-blue-600 hover:underline"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: site.cssContent || '' }} />
      <div dangerouslySetInnerHTML={{ __html: site.htmlContent || '' }} />
    </>
  );
}
