'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Site } from '@/lib/types';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';

const GrapesJSEditor = dynamic(() => import('@/components/builder/GrapesJSEditor'), {
  ssr: false,
});

export default function BuilderPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [site, setSite] = useState<Site | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user && params.id) {
      loadSite();
    }
  }, [user, params.id]);

  async function loadSite() {
    try {
      const siteDoc = await getDoc(doc(db, 'sites', params.id as string));

      if (siteDoc.exists()) {
        const siteData = {
          id: siteDoc.id,
          ...siteDoc.data(),
          createdAt: siteDoc.data().createdAt?.toDate() || new Date(),
          updatedAt: siteDoc.data().updatedAt?.toDate() || new Date(),
        } as Site;

        // Check if user owns this site
        if (siteData.userId !== user?.id) {
          router.push('/dashboard');
          return;
        }

        setSite(siteData);
      } else {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error loading site:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(html: string, css: string) {
    if (!site) return;

    setSaving(true);
    try {
      await updateDoc(doc(db, 'sites', site.id), {
        htmlContent: html,
        cssContent: css,
        updatedAt: new Date(),
      });
      setSite({ ...site, htmlContent: html, cssContent: css });
    } catch (error) {
      console.error('Error saving site:', error);
      alert('Error saving changes');
    } finally {
      setSaving(false);
    }
  }

  async function handlePublish() {
    if (!site) return;

    try {
      await updateDoc(doc(db, 'sites', site.id), {
        published: !site.published,
        updatedAt: new Date(),
      });
      setSite({ ...site, published: !site.published });
      alert(site.published ? 'Site unpublished' : 'Site published successfully!');
    } catch (error) {
      console.error('Error publishing site:', error);
      alert('Error publishing site');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading editor...</p>
        </div>
      </div>
    );
  }

  if (!site) {
    return null;
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-white border-b px-4 py-3 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">{site.title}</h1>
          <p className="text-sm text-gray-600">
            {site.subdomain}.{process.env.NEXT_PUBLIC_BASE_DOMAIN}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push('/dashboard')}>
            Back to Dashboard
          </Button>
          <Button
            variant={site.published ? 'outline' : 'default'}
            onClick={handlePublish}
          >
            {site.published ? 'Unpublish' : 'Publish'}
          </Button>
          {saving && (
            <span className="text-sm text-gray-600 flex items-center">
              Saving...
            </span>
          )}
        </div>
      </div>

      <GrapesJSEditor
        onSave={handleSave}
        initialHtml={site.htmlContent}
        initialCss={site.cssContent}
      />
    </div>
  );
}
