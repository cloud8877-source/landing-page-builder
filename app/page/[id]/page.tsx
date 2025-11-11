'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { LandingPage } from '@/lib/types';
import TemplateA from '@/lib/templates/template-a';
import TemplateB from '@/lib/templates/template-b';
import TemplateC from '@/lib/templates/template-c';

export default function PublishedLandingPage() {
  const params = useParams();
  const pageId = params.id as string;
  const [landingPage, setLandingPage] = useState<LandingPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadLandingPage();
  }, [pageId]);

  useEffect(() => {
    if (landingPage) {
      // Set up form submission handler
      const handleFormSubmit = async (e: Event) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        try {
          // Create lead document
          await addDoc(collection(db, 'leads'), {
            pageId: pageId,
            userId: landingPage.userId,
            name: formData.get('name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            message: formData.get('message') || '',
            propertyId: formData.get('propertyInterest') || '',
            submittedAt: serverTimestamp(),
            status: 'new',
          });

          alert('Thank you for your inquiry! We will get back to you soon.');
          form.reset();
        } catch (error) {
          console.error('Error submitting lead:', error);
          alert('Error submitting form. Please try again or contact us directly.');
        }
      };

      // Find and attach form submit handler
      setTimeout(() => {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
          contactForm.addEventListener('submit', handleFormSubmit as EventListener);
        }
      }, 100);

      return () => {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
          contactForm.removeEventListener('submit', handleFormSubmit as EventListener);
        }
      };
    }
  }, [landingPage, pageId]);

  const loadLandingPage = async () => {
    try {
      const docRef = doc(db, 'landingPages', pageId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const page: LandingPage = {
          id: docSnap.id,
          userId: data.userId,
          templateId: data.templateId,
          pageTitle: data.pageTitle,
          agentInfo: data.agentInfo,
          branding: data.branding,
          properties: data.properties,
          publishedUrl: data.publishedUrl,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        };
        setLandingPage(page);
      } else {
        setError('Landing page not found');
      }
    } catch (error) {
      console.error('Error loading landing page:', error);
      setError('Error loading landing page');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !landingPage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600">{error || 'The landing page you are looking for does not exist.'}</p>
        </div>
      </div>
    );
  }

  // Select appropriate template component
  const TemplateComponent =
    landingPage.templateId === 'template-a'
      ? TemplateA
      : landingPage.templateId === 'template-b'
      ? TemplateB
      : TemplateC;

  return <TemplateComponent data={landingPage} />;
}
