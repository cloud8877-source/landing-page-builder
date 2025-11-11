'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getTemplateMetadata } from '@/lib/templates/metadata';
import { LandingPageFormData, Property } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, ArrowRight, Plus, Trash2, Upload, X } from 'lucide-react';
import Link from 'next/link';

function CustomizePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading } = useAuth();
  const templateId = searchParams.get('template') || 'template-a';
  const template = getTemplateMetadata(templateId);

  // Form state
  const [formData, setFormData] = useState<LandingPageFormData>({
    pageTitle: '',
    templateId: templateId as any,
    agentInfo: {
      name: user?.name || '',
      phone: '',
      email: user?.email || '',
      whatsapp: '',
      logoUrl: '',
    },
    branding: {
      primaryColor: template.designStyle.primaryColor,
      secondaryColor: template.designStyle.secondaryColor,
    },
    properties: [],
  });

  const [currentStep, setCurrentStep] = useState<'basic' | 'properties'>('basic');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const addProperty = () => {
    if (formData.properties.length >= 6) {
      alert('Maximum 6 properties allowed');
      return;
    }

    const newProperty: Property = {
      id: `property-${Date.now()}`,
      title: '',
      price: 0,
      location: '',
      bedrooms: 0,
      bathrooms: 0,
      sqft: 0,
      type: 'Condo',
      description: '',
      photos: [],
      contactInfo: {
        phone: formData.agentInfo.phone,
        email: formData.agentInfo.email,
        whatsapp: formData.agentInfo.whatsapp,
      },
    };

    setFormData({
      ...formData,
      properties: [...formData.properties, newProperty],
    });
  };

  const removeProperty = (index: number) => {
    const newProperties = formData.properties.filter((_, i) => i !== index);
    setFormData({ ...formData, properties: newProperties });
  };

  const updateProperty = (index: number, field: string, value: any) => {
    const newProperties = [...formData.properties];
    (newProperties[index] as any)[field] = value;
    setFormData({ ...formData, properties: newProperties });
  };

  const updatePropertyContact = (index: number, field: string, value: string) => {
    const newProperties = [...formData.properties];
    const contactInfo = { ...newProperties[index].contactInfo };
    (contactInfo as any)[field] = value;
    newProperties[index].contactInfo = contactInfo;
    setFormData({ ...formData, properties: newProperties });
  };

  const handlePhotoUpload = (propertyIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    // For now, just create object URLs
    // In production, this should upload to Firebase Storage
    const photoUrls = Array.from(files).map(file => URL.createObjectURL(file));
    const currentPhotos = formData.properties[propertyIndex].photos;
    const newPhotos = [...currentPhotos, ...photoUrls].slice(0, 5);

    updateProperty(propertyIndex, 'photos', newPhotos);
  };

  const removePhoto = (propertyIndex: number, photoIndex: number) => {
    const newPhotos = formData.properties[propertyIndex].photos.filter((_, i) => i !== photoIndex);
    updateProperty(propertyIndex, 'photos', newPhotos);
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // For now, create object URL
    // In production, upload to Firebase Storage
    const logoUrl = URL.createObjectURL(file);
    setFormData({
      ...formData,
      agentInfo: { ...formData.agentInfo, logoUrl },
    });
  };

  const handleNext = () => {
    if (currentStep === 'basic') {
      // Validate basic info
      if (!formData.pageTitle || !formData.agentInfo.name || !formData.agentInfo.phone || !formData.agentInfo.email) {
        alert('Please fill in all required fields');
        return;
      }
      setCurrentStep('properties');
    } else {
      // Save and proceed to preview
      if (formData.properties.length === 0) {
        alert('Please add at least one property');
        return;
      }
      // Store in sessionStorage and navigate to preview
      sessionStorage.setItem('landingPageData', JSON.stringify(formData));
      router.push('/builder/preview');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href="/builder/select-template"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-1"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Templates
              </Link>
              <h1 className="text-2xl font-bold">Customize Your Landing Page</h1>
              <p className="text-sm text-muted-foreground">
                Step 2 of 3: Using {template.name} template
              </p>
            </div>
            <Button onClick={handleNext} size="lg">
              {currentStep === 'basic' ? 'Next: Add Properties' : 'Preview & Publish'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Step Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setCurrentStep('basic')}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition ${
              currentStep === 'basic'
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border hover:bg-accent'
            }`}
          >
            Basic Info & Branding
          </button>
          <button
            onClick={() => setCurrentStep('properties')}
            className={`flex-1 py-3 px-6 rounded-lg font-medium transition ${
              currentStep === 'properties'
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border hover:bg-accent'
            }`}
          >
            Property Listings ({formData.properties.length}/6)
          </button>
        </div>

        {/* Basic Info Step */}
        {currentStep === 'basic' && (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Landing Page Title</CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="pageTitle">Page Title *</Label>
                <Input
                  id="pageTitle"
                  placeholder="e.g., John's Premium Properties in Kuala Lumpur"
                  value={formData.pageTitle}
                  onChange={(e) => setFormData({ ...formData, pageTitle: e.target.value })}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  This will be the main headline on your landing page
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Agent Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="agentName">Agent Name *</Label>
                    <Input
                      id="agentName"
                      placeholder="John Doe"
                      value={formData.agentInfo.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          agentInfo: { ...formData.agentInfo, name: e.target.value },
                        })
                      }
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="agentPhone">Phone Number *</Label>
                    <Input
                      id="agentPhone"
                      placeholder="+60123456789"
                      value={formData.agentInfo.phone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          agentInfo: { ...formData.agentInfo, phone: e.target.value },
                        })
                      }
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="agentEmail">Email *</Label>
                    <Input
                      id="agentEmail"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.agentInfo.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          agentInfo: { ...formData.agentInfo, email: e.target.value },
                        })
                      }
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="agentWhatsApp">WhatsApp Number *</Label>
                    <Input
                      id="agentWhatsApp"
                      placeholder="60123456789 (without +)"
                      value={formData.agentInfo.whatsapp}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          agentInfo: { ...formData.agentInfo, whatsapp: e.target.value },
                        })
                      }
                      className="mt-2"
                    />
                  </div>
                </div>

                <Separator className="my-4" />

                <div>
                  <Label htmlFor="logo">Logo (Optional, max 2MB)</Label>
                  <div className="mt-2">
                    {formData.agentInfo.logoUrl ? (
                      <div className="relative inline-block">
                        <img
                          src={formData.agentInfo.logoUrl}
                          alt="Logo"
                          className="h-24 w-auto object-contain border rounded"
                        />
                        <button
                          onClick={() =>
                            setFormData({
                              ...formData,
                              agentInfo: { ...formData.agentInfo, logoUrl: '' },
                            })
                          }
                          className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:opacity-80"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex items-center justify-center gap-2 border-2 border-dashed rounded-lg p-8 cursor-pointer hover:bg-accent transition">
                        <Upload className="h-6 w-6 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Click to upload logo
                        </span>
                        <input
                          id="logo"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleLogoUpload}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Branding Colors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex gap-3 mt-2">
                      <input
                        id="primaryColor"
                        type="color"
                        value={formData.branding.primaryColor}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            branding: { ...formData.branding, primaryColor: e.target.value },
                          })
                        }
                        className="h-12 w-20 rounded cursor-pointer"
                      />
                      <Input
                        value={formData.branding.primaryColor}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            branding: { ...formData.branding, primaryColor: e.target.value },
                          })
                        }
                        placeholder="#14b8a6"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Used for buttons and accents
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex gap-3 mt-2">
                      <input
                        id="secondaryColor"
                        type="color"
                        value={formData.branding.secondaryColor}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            branding: { ...formData.branding, secondaryColor: e.target.value },
                          })
                        }
                        className="h-12 w-20 rounded cursor-pointer"
                      />
                      <Input
                        value={formData.branding.secondaryColor}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            branding: { ...formData.branding, secondaryColor: e.target.value },
                          })
                        }
                        placeholder="#1e3a8a"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Used for headers and backgrounds
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Properties Step */}
        {currentStep === 'properties' && (
          <div className="space-y-6">
            {formData.properties.map((property, index) => (
              <Card key={property.id} className="relative">
                <button
                  onClick={() => removeProperty(index)}
                  className="absolute top-4 right-4 bg-destructive text-destructive-foreground rounded-full p-2 hover:opacity-80 z-10"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                <CardHeader>
                  <CardTitle>Property #{index + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Basic Property Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label>Property Title *</Label>
                      <Input
                        placeholder="e.g., Luxury Condo in KLCC"
                        value={property.title}
                        onChange={(e) => updateProperty(index, 'title', e.target.value)}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>Price (RM) *</Label>
                      <Input
                        type="number"
                        placeholder="1500000"
                        value={property.price || ''}
                        onChange={(e) => updateProperty(index, 'price', parseFloat(e.target.value) || 0)}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>Location *</Label>
                      <Input
                        placeholder="e.g., KLCC, Kuala Lumpur"
                        value={property.location}
                        onChange={(e) => updateProperty(index, 'location', e.target.value)}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>Bedrooms *</Label>
                      <Input
                        type="number"
                        placeholder="3"
                        value={property.bedrooms || ''}
                        onChange={(e) => updateProperty(index, 'bedrooms', parseInt(e.target.value) || 0)}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>Bathrooms *</Label>
                      <Input
                        type="number"
                        placeholder="2"
                        value={property.bathrooms || ''}
                        onChange={(e) => updateProperty(index, 'bathrooms', parseInt(e.target.value) || 0)}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>Square Feet *</Label>
                      <Input
                        type="number"
                        placeholder="1200"
                        value={property.sqft || ''}
                        onChange={(e) => updateProperty(index, 'sqft', parseInt(e.target.value) || 0)}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>Property Type *</Label>
                      <select
                        value={property.type}
                        onChange={(e) => updateProperty(index, 'type', e.target.value)}
                        className="w-full mt-2 px-3 py-2 border border-input rounded-md"
                      >
                        <option value="Condo">Condo</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Landed">Landed</option>
                        <option value="Commercial">Commercial</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <Label>Description * (max 500 characters)</Label>
                    <textarea
                      placeholder="Describe the property features, amenities, etc."
                      value={property.description}
                      onChange={(e) => updateProperty(index, 'description', e.target.value.slice(0, 500))}
                      maxLength={500}
                      rows={4}
                      className="w-full mt-2 px-3 py-2 border border-input rounded-md"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {property.description.length}/500 characters
                    </p>
                  </div>

                  <Separator />

                  {/* Photos */}
                  <div>
                    <Label>Property Photos (Upload up to 5 photos, max 5MB each)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-3">
                      {property.photos.map((photo, photoIndex) => (
                        <div key={photoIndex} className="relative group">
                          <img
                            src={photo}
                            alt={`Photo ${photoIndex + 1}`}
                            className="w-full h-24 object-cover rounded border"
                          />
                          <button
                            onClick={() => removePhoto(index, photoIndex)}
                            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                      {property.photos.length < 5 && (
                        <label className="border-2 border-dashed rounded h-24 flex items-center justify-center cursor-pointer hover:bg-accent transition">
                          <Upload className="h-6 w-6 text-muted-foreground" />
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={(e) => handlePhotoUpload(index, e)}
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Contact Info for this property */}
                  <div>
                    <Label className="text-base font-semibold mb-3 block">
                      Contact Info for this Property
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm">Phone</Label>
                        <Input
                          placeholder={formData.agentInfo.phone}
                          value={property.contactInfo.phone}
                          onChange={(e) => updatePropertyContact(index, 'phone', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label className="text-sm">Email</Label>
                        <Input
                          placeholder={formData.agentInfo.email}
                          value={property.contactInfo.email}
                          onChange={(e) => updatePropertyContact(index, 'email', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label className="text-sm">WhatsApp</Label>
                        <Input
                          placeholder={formData.agentInfo.whatsapp}
                          value={property.contactInfo.whatsapp}
                          onChange={(e) => updatePropertyContact(index, 'whatsapp', e.target.value)}
                          className="mt-2"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Leave empty to use default agent contact info
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}

            {formData.properties.length < 6 && (
              <Button
                onClick={addProperty}
                variant="outline"
                size="lg"
                className="w-full border-dashed border-2"
              >
                <Plus className="mr-2 h-5 w-5" />
                Add Property ({formData.properties.length}/6)
              </Button>
            )}

            {formData.properties.length === 0 && (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground mb-4">
                  No properties added yet. Click the button above to add your first property.
                </p>
              </Card>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default function CustomizePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CustomizePageContent />
    </Suspense>
  );
}
