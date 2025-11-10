'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { isValidSubdomain } from '@/lib/utils';

const templates = [
  {
    id: 'luxury-condo',
    name: 'Luxury Condo',
    description: 'Premium condominium template',
    category: 'luxury',
  },
  {
    id: 'affordable-housing',
    name: 'Affordable Housing',
    description: 'Budget-friendly property template',
    category: 'affordable',
  },
  {
    id: 'commercial',
    name: 'Commercial Space',
    description: 'Office and retail space template',
    category: 'commercial',
  },
  {
    id: 'landed',
    name: 'Landed Property',
    description: 'Terrace and bungalow template',
    category: 'landed',
  },
  {
    id: 'serviced-apartment',
    name: 'Serviced Apartment',
    description: 'Fully furnished apartment template',
    category: 'condo',
  },
];

export default function NewBuilderPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subdomain: '',
    template: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function checkSubdomainAvailability(subdomain: string): Promise<boolean> {
    const q = query(collection(db, 'sites'), where('subdomain', '==', subdomain));
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty;
  }

  async function handleCreateSite() {
    if (!user) return;

    setError('');
    setLoading(true);

    try {
      // Validate subdomain
      if (!isValidSubdomain(formData.subdomain)) {
        setError('Invalid subdomain. Use only lowercase letters, numbers, and hyphens.');
        setLoading(false);
        return;
      }

      // Check subdomain availability
      const isAvailable = await checkSubdomainAvailability(formData.subdomain);
      if (!isAvailable) {
        setError('This subdomain is already taken. Please choose another one.');
        setLoading(false);
        return;
      }

      // Create site document
      const siteData = {
        userId: user.id,
        title: formData.title,
        description: formData.description,
        subdomain: formData.subdomain,
        template: formData.template,
        htmlContent: '',
        cssContent: '',
        jsContent: '',
        seoMetadata: {
          title: formData.title,
          description: formData.description,
          keywords: [],
        },
        published: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        language: user.language || 'en',
      };

      const docRef = await addDoc(collection(db, 'sites'), siteData);

      // Redirect to builder
      router.push(`/builder/${docRef.id}`);
    } catch (err: any) {
      console.error('Error creating site:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Create New Property Site</h1>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Choose a Template</CardTitle>
              <CardDescription>
                Select a template that best fits your property type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    onClick={() => {
                      setFormData({ ...formData, template: template.id });
                      setStep(2);
                    }}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.template === template.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                    <p className="text-sm text-gray-600">{template.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Site Details</CardTitle>
              <CardDescription>
                Enter your site information and choose a subdomain
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Site Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Luxury Condo in KLCC"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Brief description of your property"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subdomain">Subdomain</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="subdomain"
                    placeholder="mysite"
                    value={formData.subdomain}
                    onChange={(e) =>
                      setFormData({ ...formData, subdomain: e.target.value.toLowerCase() })
                    }
                    required
                  />
                  <span className="text-gray-600">.{process.env.NEXT_PUBLIC_BASE_DOMAIN}</span>
                </div>
                <p className="text-sm text-gray-500">
                  This will be your site's web address
                </p>
              </div>

              {error && (
                <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">
                  {error}
                </div>
              )}

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  onClick={handleCreateSite}
                  disabled={!formData.title || !formData.subdomain || loading}
                  className="flex-1"
                >
                  {loading ? 'Creating...' : 'Create Site'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
