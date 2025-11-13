'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '@/lib/firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ArrowLeft, Upload, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function ProfileSettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    agentName: '',
    phone: '',
    license: '',
    yearsExperience: 0,
    serviceAreas: '',
    brandColorPrimary: '#1e3a8a',
    brandColorAccent: '#d97706',
    socialFacebook: '',
    socialInstagram: '',
    socialTwitter: '',
    photoURL: '',
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }

    if (user) {
      setFormData({
        agentName: user.agentName || user.name || '',
        phone: user.phone || '',
        license: user.license || '',
        yearsExperience: user.yearsExperience || 0,
        serviceAreas: user.serviceAreas?.join(', ') || '',
        brandColorPrimary: user.brandColors?.primary || '#1e3a8a',
        brandColorAccent: user.brandColors?.accent || '#d97706',
        socialFacebook: user.socialMedia?.facebook || '',
        socialInstagram: user.socialMedia?.instagram || '',
        socialTwitter: user.socialMedia?.twitter || '',
        photoURL: user.photoURL || '',
      });
    }
  }, [user, loading, router]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setUploadingPhoto(true);

    try {
      const timestamp = Date.now();
      const storageRef = ref(storage, `users/${user.id}/profile-photos/${timestamp}_${file.name}`);

      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);

      setFormData({ ...formData, photoURL });

      // Update in Firestore
      await updateDoc(doc(db, 'users', user.id), { photoURL });

      setMessage('Profile photo updated successfully!');
    } catch (error) {
      console.error('Error uploading photo:', error);
      setMessage('Failed to upload photo');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    setSaving(true);
    setMessage('');

    try {
      const serviceAreasArray = formData.serviceAreas
        .split(',')
        .map((area) => area.trim())
        .filter((area) => area !== '');

      await updateDoc(doc(db, 'users', user.id), {
        agentName: formData.agentName,
        phone: formData.phone,
        license: formData.license,
        yearsExperience: formData.yearsExperience,
        serviceAreas: serviceAreasArray,
        brandColors: {
          primary: formData.brandColorPrimary,
          accent: formData.brandColorAccent,
        },
        socialMedia: {
          facebook: formData.socialFacebook,
          instagram: formData.socialInstagram,
          twitter: formData.socialTwitter,
        },
      });

      setMessage('Profile updated successfully!');

      // Reload page to refresh user context
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error('Error saving profile:', error);
      setMessage('Failed to save profile');
    } finally {
      setSaving(false);
    }
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b px-4 lg:px-8 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold">Agent Profile Settings</h1>
            <p className="text-sm text-muted-foreground">
              Manage your profile information
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto py-8 px-4">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Profile Photo */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Photo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-6">
                <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden">
                  {formData.photoURL ? (
                    <img
                      src={formData.photoURL}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Upload className="w-12 h-12" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    id="photo"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <label htmlFor="photo">
                    <Button type="button" variant="outline" disabled={uploadingPhoto} asChild>
                      <span className="cursor-pointer">
                        {uploadingPhoto ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Photo
                          </>
                        )}
                      </span>
                    </Button>
                  </label>
                  <p className="text-sm text-muted-foreground mt-2">
                    Recommended: Square image, at least 400x400px
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="agentName">Agent Name *</Label>
                  <Input
                    id="agentName"
                    value={formData.agentName}
                    onChange={(e) => setFormData({ ...formData, agentName: e.target.value })}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">WhatsApp Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="60123456789"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Include country code (e.g., 60 for Malaysia)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="license">REA License Number</Label>
                  <Input
                    id="license"
                    value={formData.license}
                    onChange={(e) => setFormData({ ...formData, license: e.target.value })}
                    placeholder="E12345"
                  />
                </div>

                <div>
                  <Label htmlFor="yearsExperience">Years of Experience</Label>
                  <Input
                    id="yearsExperience"
                    type="number"
                    value={formData.yearsExperience}
                    onChange={(e) =>
                      setFormData({ ...formData, yearsExperience: Number(e.target.value) })
                    }
                    placeholder="5"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="serviceAreas">Service Areas</Label>
                <Input
                  id="serviceAreas"
                  value={formData.serviceAreas}
                  onChange={(e) => setFormData({ ...formData, serviceAreas: e.target.value })}
                  placeholder="KLCC, Mont Kiara, Bangsar"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Separate multiple areas with commas
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Brand Colors */}
          <Card>
            <CardHeader>
              <CardTitle>Brand Colors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="brandColorPrimary">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="brandColorPrimary"
                      type="color"
                      value={formData.brandColorPrimary}
                      onChange={(e) =>
                        setFormData({ ...formData, brandColorPrimary: e.target.value })
                      }
                      className="w-20 h-10"
                    />
                    <Input
                      type="text"
                      value={formData.brandColorPrimary}
                      onChange={(e) =>
                        setFormData({ ...formData, brandColorPrimary: e.target.value })
                      }
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="brandColorAccent">Accent Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="brandColorAccent"
                      type="color"
                      value={formData.brandColorAccent}
                      onChange={(e) =>
                        setFormData({ ...formData, brandColorAccent: e.target.value })
                      }
                      className="w-20 h-10"
                    />
                    <Input
                      type="text"
                      value={formData.brandColorAccent}
                      onChange={(e) =>
                        setFormData({ ...formData, brandColorAccent: e.target.value })
                      }
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Media */}
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="socialFacebook">Facebook URL</Label>
                <Input
                  id="socialFacebook"
                  value={formData.socialFacebook}
                  onChange={(e) => setFormData({ ...formData, socialFacebook: e.target.value })}
                  placeholder="https://facebook.com/yourpage"
                />
              </div>

              <div>
                <Label htmlFor="socialInstagram">Instagram URL</Label>
                <Input
                  id="socialInstagram"
                  value={formData.socialInstagram}
                  onChange={(e) => setFormData({ ...formData, socialInstagram: e.target.value })}
                  placeholder="https://instagram.com/yourusername"
                />
              </div>

              <div>
                <Label htmlFor="socialTwitter">Twitter URL</Label>
                <Input
                  id="socialTwitter"
                  value={formData.socialTwitter}
                  onChange={(e) => setFormData({ ...formData, socialTwitter: e.target.value })}
                  placeholder="https://twitter.com/yourusername"
                />
              </div>
            </CardContent>
          </Card>

          {/* Message */}
          {message && (
            <div
              className={`p-4 rounded-lg ${
                message.includes('success')
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              {message}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Link href="/dashboard">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
