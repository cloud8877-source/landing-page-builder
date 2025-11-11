'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { LandingPageFormData, LandingPage } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Eye, Globe, Monitor, Smartphone, Tablet } from 'lucide-react';
import TemplateA from '@/lib/templates/template-a';
import TemplateB from '@/lib/templates/template-b';
import TemplateC from '@/lib/templates/template-c';

export default function PreviewPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [formData, setFormData] = useState<LandingPageFormData | null>(null);
  const [publishing, setPublishing] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }

    // Load form data from sessionStorage
    const savedData = sessionStorage.getItem('landingPageData');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setFormData(data);
      } catch (error) {
        console.error('Error parsing form data:', error);
        router.push('/builder/select-template');
      }
    } else {
      router.push('/builder/select-template');
    }
  }, [loading, user, router]);

  const handlePublish = async () => {
    if (!formData || !user) return;

    setPublishing(true);

    try {
      // Create landing page document
      const landingPageData: Partial<LandingPage> = {
        userId: user.id,
        templateId: formData.templateId,
        pageTitle: formData.pageTitle,
        agentInfo: formData.agentInfo,
        branding: formData.branding,
        properties: formData.properties,
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
      const publishedUrl = `${window.location.origin}/page/${docRef.id}`;

      // Show success message
      alert(`Landing page published successfully!\nURL: ${publishedUrl}`);

      // Clear sessionStorage
      sessionStorage.removeItem('landingPageData');

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      console.error('Error publishing landing page:', error);
      alert('Error publishing landing page. Please try again.');
    } finally {
      setPublishing(false);
    }
  };

  const handleDownloadHTML = () => {
    if (!formData) return;

    // Generate HTML (simplified version)
    const html = generateStaticHTML(formData);

    // Create blob and download
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.pageTitle.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateStaticHTML = (data: LandingPageFormData): string => {
    // This is a simplified version
    // In production, you'd want to use a proper HTML generator
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.pageTitle}</title>
  <meta name="description" content="${data.agentInfo.name} - Property Agent">
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <h1>Landing Page: ${data.pageTitle}</h1>
  <p>Agent: ${data.agentInfo.name}</p>
  <p>Properties: ${data.properties.length}</p>
  <!-- Full template rendering would go here -->
</body>
</html>
    `.trim();
  };

  if (loading || !formData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading preview...</p>
        </div>
      </div>
    );
  }

  // Convert formData to LandingPage format for template rendering
  const landingPageData: LandingPage = {
    id: 'preview',
    userId: user?.id || '',
    templateId: formData.templateId,
    pageTitle: formData.pageTitle,
    agentInfo: formData.agentInfo,
    branding: formData.branding,
    properties: formData.properties,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Select template component
  const TemplateComponent =
    formData.templateId === 'template-a'
      ? TemplateA
      : formData.templateId === 'template-b'
      ? TemplateB
      : TemplateC;

  const viewportWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/builder/customize?template=' + formData.templateId)}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <div>
                <h1 className="text-xl font-bold">Preview & Publish</h1>
                <p className="text-sm text-muted-foreground">Step 3 of 3</p>
              </div>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center gap-2 bg-accent rounded-lg p-1">
              <Button
                variant={viewMode === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('desktop')}
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('tablet')}
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('mobile')}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleDownloadHTML}>
                <Download className="h-4 w-4 mr-2" />
                Download HTML
              </Button>
              <Button onClick={handlePublish} disabled={publishing} size="lg">
                <Globe className="h-4 w-4 mr-2" />
                {publishing ? 'Publishing...' : 'Publish Landing Page'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Preview Frame */}
      <main className="flex-1 bg-gray-100 p-4 overflow-auto">
        <div className="mx-auto transition-all duration-300" style={{ maxWidth: viewportWidths[viewMode] }}>
          <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
            <div className="bg-yellow-100 border-b border-yellow-200 px-4 py-2 flex items-center gap-2">
              <Eye className="h-4 w-4 text-yellow-700" />
              <span className="text-sm font-medium text-yellow-700">Preview Mode</span>
            </div>

            {/* Template Rendering */}
            <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
              <TemplateComponent data={landingPageData} />
            </div>
          </div>
        </div>
      </main>

      {/* Info Banner */}
      <div className="bg-card border-t p-4">
        <div className="container mx-auto">
          <p className="text-sm text-muted-foreground text-center">
            Review your landing page carefully. You can edit the details or publish it to get a live URL.
          </p>
        </div>
      </div>
    </div>
  );
}
