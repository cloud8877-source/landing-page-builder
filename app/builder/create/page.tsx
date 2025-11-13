'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { PageType, PropertyListingData } from '@/lib/types';
import PagePurposeSelector from '@/components/wizard/PagePurposeSelector';
import PropertyListingForm from '@/components/wizard/PropertyListingForm';
import PreviewAndGenerate from '@/components/wizard/PreviewAndGenerate';
import SuccessPage from '@/components/wizard/SuccessPage';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type WizardStep = 'purpose' | 'form' | 'preview' | 'success';

export default function CreatePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<WizardStep>('purpose');
  const [selectedPageType, setSelectedPageType] = useState<PageType | null>(null);
  const [formData, setFormData] = useState<PropertyListingData | null>(null);
  const [publishedSlug, setPublishedSlug] = useState('');
  const [pageTitle, setPageTitle] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handlePageTypeSelect = (pageType: PageType) => {
    setSelectedPageType(pageType);
    setCurrentStep('form');
  };

  const handleFormSubmit = (data: PropertyListingData) => {
    setFormData(data);
    setPageTitle(data.propertyName);
    setCurrentStep('preview');
  };

  const handlePublishSuccess = (pageId: string, slug: string, htmlContent: string) => {
    setPublishedSlug(slug);
    setCurrentStep('success');
  };

  const handleBackToForm = () => {
    setCurrentStep('form');
  };

  const handleBackToPurpose = () => {
    setCurrentStep('purpose');
    setSelectedPageType(null);
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Check if user has completed profile
  if (!user.agentName || !user.phone) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="max-w-md p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Complete Your Profile First</h2>
          <p className="text-muted-foreground mb-6">
            Before creating a landing page, please complete your agent profile with your name,
            phone number, and other details.
          </p>
          <Link href="/profile/settings">
            <Button size="lg">Complete Profile</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b px-4 lg:px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">Create Landing Page</h1>
              <p className="text-sm text-muted-foreground">
                {currentStep === 'purpose' && 'Step 1 of 4: Choose page purpose'}
                {currentStep === 'form' && 'Step 2 of 4: Fill in details'}
                {currentStep === 'preview' && 'Step 3 of 4: Preview & generate'}
                {currentStep === 'success' && 'Step 4 of 4: Success!'}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-card border-b">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="flex items-center py-2">
            <div className="flex-1 flex items-center gap-2">
              <div
                className={`h-2 flex-1 rounded ${
                  currentStep !== 'purpose' ? 'bg-primary' : 'bg-gray-200'
                }`}
              />
              <div
                className={`h-2 flex-1 rounded ${
                  currentStep === 'preview' || currentStep === 'success'
                    ? 'bg-primary'
                    : 'bg-gray-200'
                }`}
              />
              <div
                className={`h-2 flex-1 rounded ${
                  currentStep === 'success' ? 'bg-primary' : 'bg-gray-200'
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="py-8">
        {currentStep === 'purpose' && <PagePurposeSelector onSelect={handlePageTypeSelect} />}

        {currentStep === 'form' && selectedPageType === 'property-listing' && (
          <PropertyListingForm
            onSubmit={handleFormSubmit}
            onBack={handleBackToPurpose}
            initialData={formData || undefined}
          />
        )}

        {currentStep === 'form' && selectedPageType !== 'property-listing' && (
          <div className="max-w-3xl mx-auto text-center py-12">
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-4">Coming Soon</h3>
              <p className="text-muted-foreground mb-6">
                This page type is not yet available. Please select Property Listing for now.
              </p>
              <Button onClick={handleBackToPurpose}>Back to Selection</Button>
            </Card>
          </div>
        )}

        {currentStep === 'preview' && formData && (
          <PreviewAndGenerate
            user={user}
            formData={formData}
            onSuccess={handlePublishSuccess}
            onBack={handleBackToForm}
          />
        )}

        {currentStep === 'success' && (
          <SuccessPage slug={publishedSlug} pageTitle={pageTitle} />
        )}
      </main>
    </div>
  );
}
