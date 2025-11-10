import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Palette, Smartphone, TrendingUp, MessageCircle, Languages } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: Globe,
      title: 'Multi-Tenant SaaS',
      description: 'Each agent gets their own subdomain with custom branding',
    },
    {
      icon: Palette,
      title: 'Drag & Drop Builder',
      description: 'Build stunning property pages with our visual editor',
    },
    {
      icon: Smartphone,
      title: 'Mobile Responsive',
      description: 'All templates are optimized for mobile devices',
    },
    {
      icon: TrendingUp,
      title: 'Lead Capture',
      description: 'Capture and manage leads with built-in forms',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Integration',
      description: 'Connect with prospects directly via WhatsApp',
    },
    {
      icon: Languages,
      title: 'Multi-Language',
      description: 'Support for English, Malay, and Mandarin',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Build Your Property Landing Page
            <span className="block text-blue-600 mt-2">In Minutes, Not Days</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The easiest way for Malaysian property agents to create professional landing pages
            and capture leads online.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="text-lg px-8 py-6">
                Start Free Trial
              </Button>
            </Link>
            <Link href="#templates">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                View Templates
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need to Succeed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index}>
                  <CardHeader>
                    <Icon className="h-12 w-12 text-blue-600 mb-4" />
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section id="templates" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Malaysian Property Templates
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Choose from 5 professionally designed templates tailored for Malaysian properties
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {['Luxury Condo', 'Affordable Housing', 'Commercial Space', 'Landed Property', 'Serviced Apartment'].map((template, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">{template}</span>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{template} Template</h3>
                  <p className="text-sm text-gray-600">Perfect for showcasing {template.toLowerCase()} listings</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of Malaysian property agents already using our platform
          </p>
          <Link href="/login">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Create Your Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Property Builder MY. All rights reserved.</p>
          <p className="mt-2 text-gray-400">Made for Malaysian Property Agents</p>
        </div>
      </footer>
    </div>
  );
}
