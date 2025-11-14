'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function HomePage() {
  const router = useRouter();
  const [activePricing, setActivePricing] = useState<'monthly' | 'yearly'>('monthly');

  const handleGetStarted = () => {
    router.push('/builder/create');
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark font-body text-body-light dark:text-body-dark">
      {/* Hero Section */}
      <section className="py-20 sm:py-28 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-heading-light dark:text-heading-dark uppercase">
                Create Your Professional Property Website in 5 Minutes
              </h1>
              <h2 className="text-lg md:text-xl font-body text-muted-light dark:text-muted-dark">
                AI-Powered Website Builder for Malaysian Property Agents. No coding required, just results.
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4">
                <button
                  onClick={handleGetStarted}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden h-14 px-8 btn-brutalist text-lg font-bold"
                >
                  <span className="truncate">Start Building Free</span>
                </button>
                <button
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden h-14 px-8 bg-transparent border-2 border-border-light dark:border-border-dark text-heading-light dark:text-heading-dark hover:bg-surface-light dark:hover:bg-surface-dark transition-colors"
                >
                  <span className="truncate">See How It Works</span>
                </button>
              </div>
            </div>
            <div className="w-full laptop-wireframe aspect-video shadow-none"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-28 bg-surface-light dark:bg-surface-dark border-t border-b border-border-light dark:border-border-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-heading-light dark:text-heading-dark uppercase">
              Everything You Need to Succeed Online
            </h2>
            <p className="mt-4 text-lg font-body text-muted-light dark:text-muted-dark">
              Built specifically for Malaysian property agents with all the features you need to attract clients and close deals.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark shadow-none">
              <div className="size-12 mb-4 brutalist-icon">
                <span className="material-symbols-outlined text-3xl">magic_button</span>
              </div>
              <h3 className="text-lg font-display font-bold text-heading-light dark:text-heading-dark uppercase">
                AI-Powered Content
              </h3>
              <p className="mt-2 text-sm font-body text-muted-light dark:text-muted-dark">
                Let AI generate professional bios, property descriptions, and compelling website copy tailored to you.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark shadow-none">
              <div className="size-12 mb-4 brutalist-icon">
                <span className="material-symbols-outlined text-3xl">touch_app</span>
              </div>
              <h3 className="text-lg font-display font-bold text-heading-light dark:text-heading-dark uppercase">
                No Coding Required
              </h3>
              <p className="mt-2 text-sm font-body text-muted-light dark:text-muted-dark">
                Simple form-based builder. If you can fill in your details, you can build a stunning website.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark shadow-none">
              <div className="size-12 mb-4 brutalist-icon">
                <span className="material-symbols-outlined text-3xl">devices</span>
              </div>
              <h3 className="text-lg font-display font-bold text-heading-light dark:text-heading-dark uppercase">
                Mobile Responsive
              </h3>
              <p className="mt-2 text-sm font-body text-muted-light dark:text-muted-dark">
                Your website looks perfect on all devices—desktops, tablets, and smartphones.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark shadow-none">
              <div className="size-12 mb-4 brutalist-icon">
                <span className="material-symbols-outlined text-3xl">bolt</span>
              </div>
              <h3 className="text-lg font-display font-bold text-heading-light dark:text-heading-dark uppercase">
                Instant Publishing
              </h3>
              <p className="mt-2 text-sm font-body text-muted-light dark:text-muted-dark">
                Go live in minutes with a free subdomain or connect your own custom domain.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark shadow-none">
              <div className="size-12 mb-4 brutalist-icon">
                <span className="material-symbols-outlined text-3xl">real_estate_agent</span>
              </div>
              <h3 className="text-lg font-display font-bold text-heading-light dark:text-heading-dark uppercase">
                Property Listings
              </h3>
              <p className="mt-2 text-sm font-body text-muted-light dark:text-muted-dark">
                Showcase unlimited properties with beautiful galleries, detailed specs, and inquiry forms.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark shadow-none">
              <div className="size-12 mb-4 brutalist-icon">
                <span className="material-symbols-outlined text-3xl">chat</span>
              </div>
              <h3 className="text-lg font-display font-bold text-heading-light dark:text-heading-dark uppercase">
                WhatsApp Integration
              </h3>
              <p className="mt-2 text-sm font-body text-muted-light dark:text-muted-dark">
                Direct WhatsApp buttons on every listing so clients can contact you instantly.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark shadow-none">
              <div className="size-12 mb-4 brutalist-icon">
                <span className="material-symbols-outlined text-3xl">search</span>
              </div>
              <h3 className="text-lg font-display font-bold text-heading-light dark:text-heading-dark uppercase">
                SEO Optimized
              </h3>
              <p className="mt-2 text-sm font-body text-muted-light dark:text-muted-dark">
                AI-generated SEO content helps your site rank higher on Google and attract more clients.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark shadow-none">
              <div className="size-12 mb-4 brutalist-icon">
                <span className="material-symbols-outlined text-3xl">domain</span>
              </div>
              <h3 className="text-lg font-display font-bold text-heading-light dark:text-heading-dark uppercase">
                Free Subdomain
              </h3>
              <p className="mt-2 text-sm font-body text-muted-light dark:text-muted-dark">
                Get a professional subdomain like yourname.propsite.my at no cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 sm:py-28 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-heading-light dark:text-heading-dark uppercase">
              How It Works
            </h2>
            <p className="mt-4 text-lg font-body text-muted-light dark:text-muted-dark">
              Three simple steps to launch your professional property website
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center p-8 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">
              <div className="size-16 mb-6 flex items-center justify-center bg-background-light dark:bg-background-dark border-2 border-border-light dark:border-border-dark">
                <span className="text-3xl font-display font-extrabold text-heading-light dark:text-heading-dark">1</span>
              </div>
              <h3 className="text-xl font-display font-bold text-heading-light dark:text-heading-dark uppercase mb-4">
                Fill In Your Information
              </h3>
              <p className="text-sm font-body text-muted-light dark:text-muted-dark">
                Enter your details, upload your photo, and let our AI generate professional content for your website. Takes just 2 minutes.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">
              <div className="size-16 mb-6 flex items-center justify-center bg-background-light dark:bg-background-dark border-2 border-border-light dark:border-border-dark">
                <span className="text-3xl font-display font-extrabold text-heading-light dark:text-heading-dark">2</span>
              </div>
              <h3 className="text-xl font-display font-bold text-heading-light dark:text-heading-dark uppercase mb-4">
                AI Generates Your Website
              </h3>
              <p className="text-sm font-body text-muted-light dark:text-muted-dark">
                Our AI creates a beautiful, professional website with all your content. Preview and customize colors, layout, and sections.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-8 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">
              <div className="size-16 mb-6 flex items-center justify-center bg-background-light dark:bg-background-dark border-2 border-border-light dark:border-border-dark">
                <span className="text-3xl font-display font-extrabold text-heading-light dark:text-heading-dark">3</span>
              </div>
              <h3 className="text-xl font-display font-bold text-heading-light dark:text-heading-dark uppercase mb-4">
                Publish Instantly
              </h3>
              <p className="text-sm font-body text-muted-light dark:text-muted-dark">
                Click publish and go live immediately. Share your website link, QR code, and start attracting clients right away.
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-12">
            <button
              onClick={handleGetStarted}
              className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden h-14 px-8 btn-brutalist text-lg font-bold"
            >
              <span className="truncate">Get Started Now</span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 sm:py-28 bg-surface-light dark:bg-surface-dark border-t border-b border-border-light dark:border-border-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-heading-light dark:text-heading-dark uppercase">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-lg font-body text-muted-light dark:text-muted-dark">
              Choose the plan that fits your needs. Start free, upgrade anytime.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="flex flex-col p-8 bg-background-light dark:bg-background-dark border-2 border-border-light dark:border-border-dark">
              <h3 className="text-2xl font-display font-bold text-heading-light dark:text-heading-dark uppercase mb-2">Free</h3>
              <div className="mb-6">
                <span className="text-4xl font-display font-extrabold text-heading-light dark:text-heading-dark">RM 0</span>
                <span className="text-muted-light dark:text-muted-dark font-body">/forever</span>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-green-600 text-xl">check_circle</span>
                  <span className="text-sm font-body text-body-light dark:text-body-dark">1 Website</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-green-600 text-xl">check_circle</span>
                  <span className="text-sm font-body text-body-light dark:text-body-dark">Free Subdomain (.propsite.my)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-green-600 text-xl">check_circle</span>
                  <span className="text-sm font-body text-body-light dark:text-body-dark">Up to 5 Properties</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-green-600 text-xl">check_circle</span>
                  <span className="text-sm font-body text-body-light dark:text-body-dark">AI Content Generation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-green-600 text-xl">check_circle</span>
                  <span className="text-sm font-body text-body-light dark:text-body-dark">Mobile Responsive</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-green-600 text-xl">check_circle</span>
                  <span className="text-sm font-body text-body-light dark:text-body-dark">WhatsApp Integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-green-600 text-xl">check_circle</span>
                  <span className="text-sm font-body text-body-light dark:text-body-dark">Basic Analytics</span>
                </li>
              </ul>
              <button
                onClick={handleGetStarted}
                className="w-full h-12 btn-brutalist"
              >
                Get Started Free
              </button>
            </div>

            {/* Pro Plan */}
            <div className="flex flex-col p-8 bg-background-light dark:bg-background-dark border-4 border-primary relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 text-xs font-bold uppercase">
                Most Popular
              </div>
              <h3 className="text-2xl font-display font-bold text-heading-light dark:text-heading-dark uppercase mb-2">Pro</h3>
              <div className="mb-6">
                <span className="text-4xl font-display font-extrabold text-heading-light dark:text-heading-dark">RM 29</span>
                <span className="text-muted-light dark:text-muted-dark font-body">/month</span>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-green-600 text-xl">check_circle</span>
                  <span className="text-sm font-body text-body-light dark:text-body-dark font-bold">Everything in Free, plus:</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-green-600 text-xl">check_circle</span>
                  <span className="text-sm font-body text-body-light dark:text-body-dark">Custom Domain Support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-green-600 text-xl">check_circle</span>
                  <span className="text-sm font-body text-body-light dark:text-body-dark">Unlimited Properties</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-green-600 text-xl">check_circle</span>
                  <span className="text-sm font-body text-body-light dark:text-body-dark">Advanced Analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-green-600 text-xl">check_circle</span>
                  <span className="text-sm font-body text-body-light dark:text-body-dark">Lead Capture Forms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-green-600 text-xl">check_circle</span>
                  <span className="text-sm font-body text-body-light dark:text-body-dark">Priority Support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-green-600 text-xl">check_circle</span>
                  <span className="text-sm font-body text-body-light dark:text-body-dark">Remove PropSite Branding</span>
                </li>
              </ul>
              <button
                onClick={handleGetStarted}
                className="w-full h-12 btn-brutalist"
              >
                Start Pro Trial
              </button>
            </div>

            {/* Premium Plan */}
            <div className="flex flex-col p-8 bg-background-light dark:bg-background-dark border-2 border-border-light dark:border-border-dark">
              <h3 className="text-2xl font-display font-bold text-heading-light dark:text-heading-dark uppercase mb-2">Premium</h3>
              <div className="mb-6">
                <span className="text-4xl font-display font-extrabold text-heading-light dark:text-heading-dark">RM 79</span>
                <span className="text-muted-light dark:text-muted-dark font-body">/month</span>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-green-600 text-xl">check_circle</span>
                  <span className="text-sm font-body text-body-light dark:text-body-dark font-bold">Everything in Pro, plus:</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-green-600 text-xl">check_circle</span>
                  <span className="text-sm font-body text-body-light dark:text-body-dark">Up to 5 Websites</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-green-600 text-xl">check_circle</span>
                  <span className="text-sm font-body text-body-light dark:text-body-dark">White Label Option</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-green-600 text-xl">check_circle</span>
                  <span className="text-sm font-body text-body-light dark:text-body-dark">Advanced Customization</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-green-600 text-xl">check_circle</span>
                  <span className="text-sm font-body text-body-light dark:text-body-dark">API Access</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-green-600 text-xl">check_circle</span>
                  <span className="text-sm font-body text-body-light dark:text-body-dark">Dedicated Account Manager</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-green-600 text-xl">check_circle</span>
                  <span className="text-sm font-body text-body-light dark:text-body-dark">24/7 Priority Support</span>
                </li>
              </ul>
              <button
                onClick={handleGetStarted}
                className="w-full h-12 btn-brutalist"
              >
                Go Premium
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 sm:py-28 bg-white dark:bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-heading-light dark:text-heading-dark uppercase">
              Trusted by Malaysian Property Agents
            </h2>
            <p className="mt-4 text-lg font-body text-muted-light dark:text-muted-dark">
              See what property agents are saying about PropSite Pro
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="flex flex-col p-6 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="material-symbols-outlined text-yellow-500 text-xl">star</span>
                ))}
              </div>
              <p className="text-sm font-body text-body-light dark:text-body-dark mb-4">
                "PropSite Pro helped me create a professional website in less than 10 minutes! The AI content generation is amazing. I've already received 3 new inquiries through my site."
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  AM
                </div>
                <div>
                  <p className="text-sm font-bold text-heading-light dark:text-heading-dark">Ahmad Musa</p>
                  <p className="text-xs text-muted-light dark:text-muted-dark">Property Agent, Kuala Lumpur</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col p-6 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="material-symbols-outlined text-yellow-500 text-xl">star</span>
                ))}
              </div>
              <p className="text-sm font-body text-body-light dark:text-body-dark mb-4">
                "As someone with zero tech skills, I was worried about creating a website. PropSite Pro made it so easy! My clients love the professional look and the WhatsApp button."
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  SL
                </div>
                <div>
                  <p className="text-sm font-bold text-heading-light dark:text-heading-dark">Sarah Lim</p>
                  <p className="text-xs text-muted-light dark:text-muted-dark">Real Estate Negotiator, Penang</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col p-6 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="material-symbols-outlined text-yellow-500 text-xl">star</span>
                ))}
              </div>
              <p className="text-sm font-body text-body-light dark:text-body-dark mb-4">
                "The analytics feature helps me track which properties get the most views. The Pro plan is worth every ringgit. Best investment for my property business!"
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  RK
                </div>
                <div>
                  <p className="text-sm font-bold text-heading-light dark:text-heading-dark">Raj Kumar</p>
                  <p className="text-xs text-muted-light dark:text-muted-dark">Property Consultant, Johor Bahru</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-extrabold uppercase mb-4">
            Ready to Build Your Property Website?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of Malaysian property agents who are growing their business online with PropSite Pro.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-white text-primary hover:bg-gray-100 transition-colors flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden h-14 px-8 text-lg font-bold mx-auto"
          >
            <span className="truncate">Create Your Website Now</span>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="size-6 text-primary logo-svg-brutalist">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_6_543_footer)">
                    <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
                    <path clipRule="evenodd" d="M7.24189 26.4066C7.31369 26.4411 7.64204 26.5637 8.52504 26.3738C9.59462 26.1438 11.0343 25.5311 12.7183 24.4963C14.7583 23.2426 17.0256 21.4503 19.238 19.238C21.4503 17.0256 23.2426 14.7583 24.4963 12.7183C25.5311 11.0343 26.1438 9.59463 26.3738 8.52504C26.5637 7.64204 26.4411 7.31369 26.4066 7.24189C26.345 7.21246 26.143 7.14535 25.6664 7.1918C24.9745 7.25925 23.9954 7.5498 22.7699 8.14278C20.3369 9.32007 17.3369 11.4915 14.4142 14.4142C11.4915 17.3369 9.32007 20.3369 8.14278 22.7699C7.5498 23.9954 7.25925 24.9745 7.1918 25.6664C7.14534 26.143 7.21246 26.345 7.24189 26.4066ZM29.9001 10.7285C29.4519 12.0322 28.7617 13.4172 27.9042 14.8126C26.465 17.1544 24.4686 19.6641 22.0664 22.0664C19.6641 24.4686 17.1544 26.465 14.8126 27.9042C13.4172 28.7617 12.0322 29.4519 10.7285 29.9001L21.5754 40.747C21.6001 40.7606 21.8995 40.931 22.8729 40.7217C23.9424 40.4916 25.3821 39.879 27.0661 38.8441C29.1062 37.5904 31.3734 35.7982 33.5858 33.5858C35.7982 31.3734 37.5904 29.1062 38.8441 27.0661C39.879 25.3821 40.4916 23.9425 40.7216 22.8729C40.931 21.8995 40.7606 21.6001 40.747 21.5754L29.9001 10.7285ZM29.2403 4.41187L43.5881 18.7597C44.9757 20.1473 44.9743 22.1235 44.6322 23.7139C44.2714 25.3919 43.4158 27.2666 42.252 29.1604C40.8128 31.5022 38.8165 34.012 36.4142 36.4142C34.012 38.8165 31.5022 40.8128 29.1604 42.252C27.2666 43.4158 25.3919 44.2714 23.7139 44.6322C22.1235 44.9743 20.1473 44.9757 18.7597 43.5881L4.41187 29.2403C3.29027 28.1187 3.08209 26.5973 3.21067 25.2783C3.34099 23.9415 3.8369 22.4852 4.54214 21.0277C5.96129 18.0948 8.43335 14.7382 11.5858 11.5858C14.7382 8.43335 18.0948 5.9613 21.0277 4.54214C22.4852 3.8369 23.9415 3.34099 25.2783 3.21067C26.5973 3.08209 28.1187 3.29028 29.2403 4.41187Z" fill="currentColor" fillRule="evenodd"></path>
                  </g>
                  <defs><clipPath id="clip0_6_543_footer"><rect fill="white" height="48" width="48"></rect></clipPath></defs>
                </svg>
              </div>
              <p className="text-base font-display font-bold text-heading-light dark:text-heading-dark uppercase">PropSite Pro</p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <Link href="/terms" className="hover:underline">Terms of Service</Link>
              <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
              <Link href="/contact" className="hover:underline">Contact Us</Link>
              <Link href="/help" className="hover:underline">Help Center</Link>
            </div>
            <p className="text-sm font-body text-muted-light dark:text-muted-dark">&copy; 2024 PropSite Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
