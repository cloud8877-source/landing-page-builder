'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getAllTemplates } from '@/lib/templates/metadata';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Check, ExternalLink, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function SelectTemplatePage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const templates = getAllTemplates();

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

  if (!user) {
    router.push('/login');
    return null;
  }

  const handleSelectTemplate = (templateId: string) => {
    // Navigate to customization form with selected template
    router.push(`/builder/customize?template=${templateId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold">Create New Landing Page</h1>
              <p className="text-muted-foreground mt-1">
                Step 1 of 3: Choose a template that fits your style
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Template Selection */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Progress Indicator */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <span className="font-medium">Select Template</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-300"></div>
              <div className="flex items-center gap-2 opacity-40">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <span className="font-medium">Customize</span>
              </div>
              <div className="w-16 h-0.5 bg-gray-300"></div>
              <div className="flex items-center gap-2 opacity-40">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <span className="font-medium">Publish</span>
              </div>
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {templates.map((template) => (
              <Card
                key={template.id}
                className={`overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer ${
                  selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                {/* Template Preview Thumbnail */}
                <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden group">
                  {/* Mock screenshot - you can replace with actual thumbnails */}
                  <div
                    className="w-full h-full flex items-center justify-center text-white font-bold text-2xl"
                    style={{ backgroundColor: template.designStyle.primaryColor }}
                  >
                    <div className="text-center p-6">
                      <Sparkles className="h-16 w-16 mx-auto mb-4 opacity-80" />
                      <p className="text-sm opacity-90">Preview</p>
                      <p className="text-xs opacity-70 mt-1">{template.name}</p>
                    </div>
                  </div>

                  {/* Selected Indicator */}
                  {selectedTemplate === template.id && (
                    <div className="absolute top-4 right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Check className="h-5 w-5 text-primary-foreground" />
                    </div>
                  )}

                  {/* View Demo Button (on hover) */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Open demo in new tab
                        window.open(template.demoUrl || '#', '_blank');
                      }}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Live Demo
                    </Button>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{template.name}</span>
                    {selectedTemplate === template.id && (
                      <Badge variant="default">Selected</Badge>
                    )}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Target Audience */}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Best for:
                    </p>
                    <Badge variant="outline">{template.targetAudience}</Badge>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {template.description}
                  </p>

                  {/* Features */}
                  <div>
                    <p className="text-sm font-medium mb-2">Features:</p>
                    <ul className="space-y-1">
                      {template.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                          <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Design Style Preview */}
                  <div className="pt-4 border-t">
                    <p className="text-xs font-medium text-muted-foreground mb-2">
                      Color Palette:
                    </p>
                    <div className="flex gap-2">
                      <div
                        className="w-8 h-8 rounded border border-gray-200"
                        style={{ backgroundColor: template.designStyle.primaryColor }}
                        title="Primary Color"
                      ></div>
                      <div
                        className="w-8 h-8 rounded border border-gray-200"
                        style={{ backgroundColor: template.designStyle.secondaryColor }}
                        title="Secondary Color"
                      ></div>
                      <div
                        className="w-8 h-8 rounded border border-gray-200"
                        style={{ backgroundColor: template.designStyle.backgroundColor }}
                        title="Background"
                      ></div>
                    </div>
                  </div>

                  {/* Use This Template Button */}
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectTemplate(template.id);
                    }}
                  >
                    Use This Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Help Text */}
          <div className="mt-12 text-center max-w-2xl mx-auto">
            <p className="text-sm text-muted-foreground">
              Not sure which template to choose? Each template can be fully customized with your
              own colors, logo, and content. You can preview how they look before publishing.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
