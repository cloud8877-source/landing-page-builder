'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PropertyListingData } from '@/lib/types';
import { Upload, X } from 'lucide-react';

interface PropertyListingFormProps {
  onSubmit: (data: PropertyListingData) => void;
  onBack: () => void;
  initialData?: Partial<PropertyListingData>;
}

export default function PropertyListingForm({
  onSubmit,
  onBack,
  initialData,
}: PropertyListingFormProps) {
  const [formData, setFormData] = useState<Partial<PropertyListingData>>({
    propertyName: initialData?.propertyName || '',
    price: initialData?.price || 0,
    bedrooms: initialData?.bedrooms || 3,
    bathrooms: initialData?.bathrooms || 2,
    sqft: initialData?.sqft || 1000,
    location: initialData?.location || '',
    description: initialData?.description || '',
    features: initialData?.features || ['', '', '', '', '', ''],
    amenities: initialData?.amenities || ['', '', ''],
    images: initialData?.images || [],
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Limit to 6 images
    const limitedFiles = files.slice(0, 6);

    // Create preview URLs
    const previews = limitedFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);

    setFormData({ ...formData, images: limitedFiles });
  };

  const removeImage = (index: number) => {
    const newImages = [...(formData.images || [])];
    const newPreviews = [...imagePreviews];

    newImages.splice(index, 1);
    newPreviews.splice(index, 1);

    setFormData({ ...formData, images: newImages });
    setImagePreviews(newPreviews);
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...(formData.features || ['', '', '', '', '', ''])];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const handleAmenityChange = (index: number, value: string) => {
    const newAmenities = [...(formData.amenities || ['', '', ''])];
    newAmenities[index] = value;
    setFormData({ ...formData, amenities: newAmenities });
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.propertyName || formData.propertyName.trim() === '') {
      newErrors.propertyName = 'Property name is required';
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Valid price is required';
    }

    if (!formData.location || formData.location.trim() === '') {
      newErrors.location = 'Location is required';
    }

    if (!formData.description || formData.description.trim().length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
    }

    if (!formData.images || formData.images.length < 6) {
      newErrors.images = 'Please upload exactly 6 property images';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onSubmit(formData as PropertyListingData);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">Property Listing Details</h2>
        <p className="text-muted-foreground">
          Fill in the details for your property listing
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="propertyName">Property Name / Title *</Label>
              <Input
                id="propertyName"
                value={formData.propertyName}
                onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
                placeholder="e.g., Luxury Condo in KLCC"
              />
              {errors.propertyName && (
                <p className="text-sm text-red-500 mt-1">{errors.propertyName}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price (RM) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  placeholder="850000"
                />
                {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
              </div>

              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., KLCC, Kuala Lumpur"
                />
                {errors.location && <p className="text-sm text-red-500 mt-1">{errors.location}</p>}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="bedrooms">Bedrooms *</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: Number(e.target.value) })}
                />
              </div>

              <div>
                <Label htmlFor="bathrooms">Bathrooms *</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData({ ...formData, bathrooms: Number(e.target.value) })}
                />
              </div>

              <div>
                <Label htmlFor="sqft">Square Feet *</Label>
                <Input
                  id="sqft"
                  type="number"
                  value={formData.sqft}
                  onChange={(e) => setFormData({ ...formData, sqft: Number(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <textarea
                id="description"
                className="w-full min-h-[120px] p-3 border rounded-md"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the property in 200-400 characters..."
                maxLength={400}
              />
              <p className="text-sm text-muted-foreground mt-1">
                {formData.description?.length || 0} / 400 characters (minimum 50)
              </p>
              {errors.description && (
                <p className="text-sm text-red-500 mt-1">{errors.description}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Property Features */}
        <Card>
          <CardHeader>
            <CardTitle>Property Features (6 features)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <div key={index}>
                <Label htmlFor={`feature-${index}`}>Feature {index + 1}</Label>
                <Input
                  id={`feature-${index}`}
                  value={formData.features?.[index] || ''}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  placeholder={`e.g., ${
                    ['Swimming Pool', 'Gym', '24/7 Security', 'Parking', 'Balcony', 'Wi-Fi'][index]
                  }`}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Nearby Amenities */}
        <Card>
          <CardHeader>
            <CardTitle>Nearby Amenities (3 amenities)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[0, 1, 2].map((index) => (
              <div key={index}>
                <Label htmlFor={`amenity-${index}`}>Amenity {index + 1}</Label>
                <Input
                  id={`amenity-${index}`}
                  value={formData.amenities?.[index] || ''}
                  onChange={(e) => handleAmenityChange(index, e.target.value)}
                  placeholder={`e.g., ${
                    ['5 min to LRT Station', '10 min to Shopping Mall', 'Near International School'][
                      index
                    ]
                  }`}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Image Upload */}
        <Card>
          <CardHeader>
            <CardTitle>Property Images (6 images required) *</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <input
                  type="file"
                  id="images"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label htmlFor="images" className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                  <p className="text-sm font-medium mb-1">Click to upload images</p>
                  <p className="text-xs text-muted-foreground">
                    Upload exactly 6 images (PNG, JPG, JPEG)
                  </p>
                </label>
              </div>

              {errors.images && <p className="text-sm text-red-500">{errors.images}</p>}

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full aspect-square object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-sm text-muted-foreground">
                {imagePreviews.length} / 6 images uploaded
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button type="submit">Continue to Preview</Button>
        </div>
      </form>
    </div>
  );
}
