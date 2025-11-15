'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { User, LandingPageFormData } from '@/lib/types';
import { processTemplate, generateSlug, uploadImages } from '@/lib/template-processor';
import { propertyListingTemplate } from '@/lib/templates/property-listing';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

interface PreviewAndGenerateProps {
  user: User;
  formData: LandingPageFormData;
  onSuccess: (pageId: string, slug: string, htmlContent: string) => void;
  onBack: () => void;
}

export default function PreviewAndGenerate({
  user,
  formData,
  onSuccess,
  onBack,
}: PreviewAndGenerateProps) {
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [previewHTML, setPreviewHTML] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    generatePreview();
  }, []);

  async function generatePreview() {
    setGenerating(true);
    setProgress(10);
    setStatusMessage('Preparing your landing page...');

    try {
      // Step 1: Upload images to Firebase Storage
      setProgress(30);
      setStatusMessage('Uploading property images...');

      const tempPageId = `temp-${Date.now()}`;
      const imageURLs: string[] = []; // TODO: Implement image upload functionality

      // Step 2: Process template with data
      setProgress(60);
      setStatusMessage('Processing template...');

      const htmlContent = propertyListingTemplate.generateHTML({
      agentInfo: {
        name: user.name,
        phone: user.phone || '',
        email: user.email,
        whatsapp: user.phone || '',
        agency: user.agentName
      },
      properties: formData.properties || [],
      theme: {
        primaryColor: user.brandColors?.primary || '#2563eb',
        secondaryColor: user.brandColors?.accent || '#64748b'
      }
    });
      setPreviewHTML(htmlContent);

      setProgress(100);
      setStatusMessage('Preview ready!');
      setGenerating(false);
    } catch (err) {
      console.error('Error generating preview:', err);
      setError('Failed to generate preview. Please try again.');
      setGenerating(false);
    }
  }

  async function handlePublish() {
    setGenerating(true);
    setProgress(10);
    setStatusMessage('Publishing your landing page...');

    try {
      // Step 1: Upload images again for final page
      setProgress(20);
      const pageId = `page-${Date.now()}`;
      const imageURLs: string[] = []; // TODO: Implement image upload functionality

      // Step 2: Generate slug
      setProgress(40);
      setStatusMessage('Generating unique URL...');
      const slug = generateSlug(user.agentName || user.name, formData.pageTitle);

      // Step 3: Process final template
      setProgress(60);
      setStatusMessage('Creating final page...');
      const htmlContent = propertyListingTemplate.generateHTML({
      agentInfo: {
        name: user.name,
        phone: user.phone || '',
        email: user.email,
        whatsapp: user.phone || '',
        agency: user.agentName
      },
      properties: formData.properties || [],
      theme: {
        primaryColor: user.brandColors?.primary || '#2563eb',
        secondaryColor: user.brandColors?.accent || '#64748b'
      }
    });

      // Step 4: Save to Firestore
      setProgress(80);
      setStatusMessage('Saving to database...');

      const pageData = {
        userId: user.id,
        pageType: 'property-listing',
        slug,
        title: formData.pageTitle,
        status: 'published',
        data: formData,
        htmlContent,
        imageURLs,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        views: 0,
      };

      const docRef = await addDoc(collection(db, 'pages'), pageData);

      setProgress(100);
      setStatusMessage('Success!');

      // Navigate to success page
      setTimeout(() => {
        onSuccess(docRef.id, slug, htmlContent);
      }, 500);
    } catch (err) {
      console.error('Error publishing page:', err);
      setError('Failed to publish page. Please try again.');
      setGenerating(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">Preview & Generate</h2>
        <p className="text-muted-foreground">
          Review your landing page before publishing
        </p>
      </div>

      {generating && (
        <Card className="p-8 mb-6">
          <div className="text-center space-y-4">
            <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
            <div>
              <p className="font-semibold text-lg">{statusMessage}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">{progress}% complete</p>
            </div>
          </div>
        </Card>
      )}

      {error && (
        <Card className="p-6 mb-6 border-red-500 bg-red-50">
          <p className="text-red-600 font-semibold">{error}</p>
        </Card>
      )}

      {!generating && previewHTML && (
        <>
          <Card className="mb-6 overflow-hidden">
            <div className="bg-gray-100 p-3 border-b">
              <p className="text-sm text-muted-foreground text-center">
                Preview (scroll to see full page)
              </p>
            </div>
            <div className="bg-white">
              <iframe
                srcDoc={previewHTML}
                className="w-full h-[600px] border-0"
                title="Landing Page Preview"
              />
            </div>
          </Card>

          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={onBack} disabled={generating}>
              Back to Edit
            </Button>
            <div className="space-x-3">
              <Button variant="outline" onClick={generatePreview} disabled={generating}>
                Regenerate Preview
              </Button>
              <Button onClick={handlePublish} disabled={generating} size="lg">
                {generating ? 'Publishing...' : 'Publish Landing Page'}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
