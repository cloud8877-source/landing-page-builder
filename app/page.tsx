'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Palette, Smartphone, TrendingUp, MessageCircle, Languages, Sparkles } from 'lucide-react';
import { enableDemoMode } from '@/lib/demo-mode';

export default function HomePage() {
  const router = useRouter();

  const handleTryDemo = () => {
    enableDemoMode();
    router.push('/builder/select-template');
  };

  const features = [
    {
      icon: Globe,
      title: 'Professional Templates',
      description: 'Choose from 3 templates designed for Malaysian properties',
    },
    {
      icon: Palette,
      title: 'Easy Customization',
      description: 'Simple form-based builder - no technical skills needed',
    },
    {
      icon: Smartphone,
      title: 'Mobile Responsive',
      description: 'All templates work perfectly on mobile devices',
    },
    {
      icon: TrendingUp,
      title: 'Lead Capture',
      description: 'Built-in contact forms capture leads automatically',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp Integration',
      description: 'Direct WhatsApp buttons on every property listing',
    },
    {
      icon: Languages,
      title: 'RM Currency Support',
      description: 'Malaysian Ringgit formatting and local phone numbers',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block mb-4">
            <span className="bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full">
              ✨ No Credit Card Required
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Build Your Property Landing Page
            <span className="block text-blue-600 mt-2">In Minutes, Not Days</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The easiest way for Malaysian property agents to create professional landing pages
            and capture leads online. Simple form-based builder - no technical skills needed!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
              onClick={handleTryDemo}
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Try Demo - No Login Required
            </Button>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Sign Up Free
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Try the full builder in demo mode, then sign up to save and publish
          </p>
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
            3 Professional Templates
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Choose the perfect design for your property type - all mobile-responsive
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-teal-500 to-blue-800 flex items-center justify-center relative">
                <span className="text-white text-2xl font-bold">Clean & Functional</span>
                <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-white text-xs font-medium">
                  Most Popular
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Template A</h3>
                <p className="text-sm text-gray-600 mb-3">PropertyGuru-style grid layout. Perfect for all property types.</p>
                <div className="text-xs text-gray-500 space-y-1">
                  <div>✓ 3-column grid</div>
                  <div>✓ Search bar</div>
                  <div>✓ Broad audience</div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow border-2 border-blue-500">
              <div className="h-48 bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center relative">
                <span className="text-yellow-400 text-2xl font-bold">Polished & Luxury</span>
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Template B</h3>
                <p className="text-sm text-gray-600 mb-3">Dark theme with gold accents. Ideal for luxury properties.</p>
                <div className="text-xs text-gray-500 space-y-1">
                  <div>✓ Large property cards</div>
                  <div>✓ VIP service sections</div>
                  <div>✓ Luxury market</div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center relative">
                <span className="text-white text-2xl font-bold">Corporate Minimal</span>
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2">Template C</h3>
                <p className="text-sm text-gray-600 mb-3">Clean list view. Perfect for commercial properties.</p>
                <div className="text-xs text-gray-500 space-y-1">
                  <div>✓ List view layout</div>
                  <div>✓ Specs table</div>
                  <div>✓ Commercial focus</div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Button onClick={handleTryDemo} variant="outline" size="lg">
              <Sparkles className="mr-2 h-5 w-5" />
              Try All Templates in Demo
            </Button>
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
