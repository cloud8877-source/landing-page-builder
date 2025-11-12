import React from 'react';
import { LandingPage } from '@/lib/types';
import { Building, Bed, Bath, Maximize, Phone, Mail, MapPin, FileText, Download, Star, Award, TrendingUp, Users, CheckCircle, Play } from 'lucide-react';

interface TemplateCProps {
  data: LandingPage;
}

export default function TemplateC({ data }: TemplateCProps) {
  const { agentInfo, branding, properties, pageTitle } = data;

  const formatPrice = (price: number) => {
    return `RM ${price.toLocaleString('en-MY')}`;
  };

  const handleInquire = (property: any) => {
    const subject = encodeURIComponent(`Inquiry: ${property.title}`);
    const body = encodeURIComponent(
      `Hi ${agentInfo.name},\n\nI'm interested in the following property:\n\n${property.title}\nLocation: ${property.location}\nPrice: ${formatPrice(property.price)}\n\nPlease provide more information.\n\nThank you.`
    );
    window.location.href = `mailto:${property.contactInfo.email}?subject=${subject}&body=${body}`;
  };

  // Professional testimonials
  const testimonials = [
    { name: 'Corporate Tenant A', rating: 5, text: 'Professional service, excellent commercial property portfolio.', company: 'Tech Solutions Inc.' },
    { name: 'Business Owner B', rating: 5, text: 'Helped us find the perfect office space quickly and efficiently.', company: 'Marketing Agency' },
    { name: 'Investor C', rating: 5, text: 'Solid investment advice and transparent property valuations.', company: 'Investment Group' },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: 'DM Sans, sans-serif' }}>
      {/* Minimal Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              {agentInfo.logoUrl ? (
                <img
                  src={agentInfo.logoUrl}
                  alt={agentInfo.name}
                  className="h-10 w-auto object-contain"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <div
                    className="w-10 h-10 flex items-center justify-center text-white font-bold rounded"
                    style={{ backgroundColor: branding.primaryColor }}
                  >
                    {agentInfo.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xl font-bold text-gray-900">{agentInfo.name}</span>
                </div>
              )}
              <span className="text-sm text-gray-500 ml-4 hidden md:inline">Commercial Properties</span>
            </div>

            {/* Contact Button */}
            <a
              href="#contact"
              className="px-6 py-2 rounded border-2 font-medium transition hover:bg-gray-900 hover:text-white"
              style={{ borderColor: branding.primaryColor, color: branding.primaryColor }}
            >
              Contact
            </a>
          </div>
        </div>
      </header>

      {/* Hero - Enhanced Minimal */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-24 md:py-32 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 mb-6" style={{ borderColor: branding.primaryColor }}>
              <Award className="h-4 w-4" style={{ color: branding.primaryColor }} />
              <span className="text-sm font-bold" style={{ color: branding.primaryColor }}>Certified Professional Agent</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              {pageTitle}
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 mb-6 font-semibold">
              {agentInfo.name}
            </p>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl">
              Professional Commercial Property Solutions. Expert guidance for your business growth and investment success.
            </p>

            {/* Enhanced Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Building className="h-6 w-6" style={{ color: branding.primaryColor }} />
                  <span className="text-3xl font-bold text-gray-900">{properties.length}+</span>
                </div>
                <p className="text-sm text-gray-600 font-medium">Properties</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-6 w-6" style={{ color: branding.primaryColor }} />
                  <span className="text-3xl font-bold text-gray-900">200+</span>
                </div>
                <p className="text-sm text-gray-600 font-medium">Clients Served</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-6 w-6" style={{ color: branding.primaryColor }} />
                  <span className="text-3xl font-bold text-gray-900">12+</span>
                </div>
                <p className="text-sm text-gray-600 font-medium">Years</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-6 w-6 fill-current" style={{ color: branding.primaryColor }} />
                  <span className="text-3xl font-bold text-gray-900">4.9</span>
                </div>
                <p className="text-sm text-gray-600 font-medium">Rating</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4 flex-wrap">
              <a
                href="#properties"
                className="px-8 py-4 rounded-xl font-bold text-white transition-all hover:shadow-xl transform hover:scale-105 text-lg"
                style={{ backgroundColor: branding.primaryColor }}
              >
                Browse Properties
              </a>
              <a
                href={`tel:${agentInfo.phone}`}
                className="px-8 py-4 rounded-xl border-2 font-bold transition-all hover:bg-gray-50 text-lg flex items-center gap-2"
                style={{ borderColor: branding.primaryColor, color: branding.primaryColor }}
              >
                <Phone className="h-5 w-5" />
                {agentInfo.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Property Showcase - List View */}
      <section id="properties" className="py-20">
        <div className="container mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">Available Properties</h2>
            <div className="w-24 h-1 mx-auto mb-4" style={{ backgroundColor: branding.primaryColor }}></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Strategic locations. Competitive pricing. Professional service.
            </p>
          </div>

          <div className="space-y-6">
            {properties.map((property, index) => (
              <div
                key={property.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                  {/* Property Photo - Left */}
                  <div className="relative h-80 lg:h-auto bg-gray-100">
                    {property.photos[0] ? (
                      <img
                        src={property.photos[0]}
                        alt={property.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <Building className="h-16 w-16 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Specifications - Middle */}
                  <div className="lg:col-span-2 p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{property.title}</h3>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="h-4 w-4" style={{ color: branding.primaryColor }} />
                          <span className="text-sm">{property.location}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold" style={{ color: branding.primaryColor }}>
                          {formatPrice(property.price)}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">{property.type}</p>
                      </div>
                    </div>

                    {/* Specifications Table */}
                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div>
                          <p className="text-xs text-gray-500 uppercase mb-1 font-medium">Bedrooms</p>
                          <div className="flex items-center gap-2">
                            <Bed className="h-5 w-5 text-gray-600" />
                            <span className="text-lg font-bold">{property.bedrooms}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase mb-1 font-medium">Bathrooms</p>
                          <div className="flex items-center gap-2">
                            <Bath className="h-5 w-5 text-gray-600" />
                            <span className="text-lg font-bold">{property.bathrooms}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase mb-1 font-medium">Size</p>
                          <div className="flex items-center gap-2">
                            <Maximize className="h-5 w-5 text-gray-600" />
                            <span className="text-lg font-bold">{property.sqft}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase mb-1 font-medium">Type</p>
                          <div className="flex items-center gap-2">
                            <Building className="h-5 w-5 text-gray-600" />
                            <span className="text-lg font-bold">{property.type}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                      {property.description}
                    </p>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleInquire(property)}
                        className="px-6 py-3 rounded font-medium text-white transition hover:opacity-90"
                        style={{ backgroundColor: branding.primaryColor }}
                      >
                        Inquire Now
                      </button>
                      <a
                        href={`tel:${property.contactInfo.phone}`}
                        className="px-6 py-3 rounded border-2 font-medium transition hover:bg-gray-50"
                        style={{ borderColor: branding.primaryColor, color: branding.primaryColor }}
                      >
                        <Phone className="h-4 w-4 inline mr-2" />
                        Call
                      </a>
                      <button
                        className="px-6 py-3 rounded border border-gray-300 font-medium text-gray-700 hover:bg-gray-50 transition"
                      >
                        <FileText className="h-4 w-4 inline mr-2" />
                        View Specs
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - NEW */}
      <section className="py-20 bg-white border-y border-gray-200">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 mb-4">
              <Star className="h-4 w-4 fill-current" style={{ color: branding.primaryColor }} />
              <span className="text-sm font-bold text-gray-900">Client Testimonials</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Proven Track Record
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              What our business clients say about working with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-gray-300 transition-all hover:shadow-lg"
              >
                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" style={{ color: branding.primaryColor }} />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Client Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                  <div
                    className="w-12 h-12 rounded flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: branding.primaryColor }}
                  >
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Professional Badges */}
          <div className="mt-16 flex items-center justify-center gap-12 flex-wrap">
            <div className="text-center">
              <CheckCircle className="h-10 w-10 mx-auto mb-2" style={{ color: branding.primaryColor }} />
              <p className="text-sm font-semibold text-gray-900">Verified Listings</p>
            </div>
            <div className="text-center">
              <Award className="h-10 w-10 mx-auto mb-2" style={{ color: branding.primaryColor }} />
              <p className="text-sm font-semibold text-gray-900">Industry Certified</p>
            </div>
            <div className="text-center">
              <TrendingUp className="h-10 w-10 mx-auto mb-2" style={{ color: branding.primaryColor }} />
              <p className="text-sm font-semibold text-gray-900">Market Leader</p>
            </div>
          </div>
        </div>
      </section>

      {/* Location Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Property Locations</h2>
              <p className="text-lg text-gray-600">Strategic locations across prime commercial areas</p>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
              <MapPin className="h-16 w-16 mx-auto mb-4" style={{ color: branding.primaryColor }} />
              <p className="text-gray-600 mb-6">Interactive map showing all property locations</p>
              <div className="flex flex-wrap gap-3 justify-center">
                {properties.map((property) => (
                  <span
                    key={property.id}
                    className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-700"
                  >
                    {property.location}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Brochure CTA */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-gray-900 rounded-2xl p-12 text-center text-white">
            <Download className="h-16 w-16 mx-auto mb-6" style={{ color: branding.primaryColor }} />
            <h2 className="text-3xl font-bold mb-4">Request Full Property Catalog</h2>
            <p className="text-lg text-gray-300 mb-8">
              Get detailed information, floor plans, and pricing for all available properties
            </p>
            <button
              className="px-8 py-4 rounded-lg font-bold text-lg text-gray-900 transition hover:opacity-90"
              style={{ backgroundColor: branding.primaryColor }}
            >
              Download Catalog
            </button>
          </div>
        </div>
      </section>

      {/* Contact Form - Optimized */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Let's Discuss Your Needs</h2>
              <div className="w-24 h-1 mx-auto mb-4" style={{ backgroundColor: branding.primaryColor }}></div>
              <p className="text-xl text-gray-600">
                Professional consultation. Quick response. No obligations.
              </p>
            </div>

            <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-10">
              {/* Simplified Professional Form */}
              <form className="space-y-6" id="contact-form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-3">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all text-lg bg-white"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-gray-900 mb-3">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all text-lg bg-white"
                      placeholder="+60 12-345 6789"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-3">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all text-lg bg-white"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="property-interest" className="block text-sm font-bold text-gray-900 mb-3">
                    Property Interest (Optional)
                  </label>
                  <select
                    id="property-interest"
                    name="propertyInterest"
                    className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:border-transparent transition-all text-lg bg-white"
                  >
                    <option value="">Select a property or leave blank</option>
                    {properties.map((property) => (
                      <option key={property.id} value={property.id}>
                        {property.title}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-5 px-6 rounded-xl font-bold text-xl text-white transition-all hover:shadow-2xl transform hover:scale-[1.02] flex items-center justify-center gap-2"
                  style={{ backgroundColor: branding.primaryColor }}
                >
                  <Mail className="h-5 w-5" />
                  Request Information
                </button>

                <p className="text-sm text-center text-gray-600 mt-4 flex items-center justify-center gap-2">
                  <CheckCircle className="h-4 w-4" style={{ color: branding.primaryColor }} />
                  Response within 24 business hours guaranteed
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Minimalist Footer */}
      <footer className="bg-white border-t border-gray-200 py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between flex-wrap gap-4 text-sm text-gray-600">
            <div>
              <p className="font-medium text-gray-900">{agentInfo.name}</p>
              <p className="text-xs text-gray-500 mt-1">Professional Commercial Property Services</p>
            </div>
            <div className="flex items-center gap-6">
              <a href={`mailto:${agentInfo.email}`} className="hover:text-gray-900 transition">
                {agentInfo.email}
              </a>
              <span className="text-gray-400">|</span>
              <a href={`tel:${agentInfo.phone}`} className="hover:text-gray-900 transition">
                {agentInfo.phone}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
