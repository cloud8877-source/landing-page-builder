import React from 'react';
import { LandingPage } from '@/lib/types';
import { Building, Bed, Bath, Maximize, Phone, Mail, MessageCircle, MapPin, Star, Award, TrendingUp, Users, CheckCircle, Play } from 'lucide-react';

interface TemplateAProps {
  data: LandingPage;
}

export default function TemplateA({ data }: TemplateAProps) {
  const { agentInfo, branding, properties, pageTitle } = data;

  const formatPrice = (price: number) => {
    return `RM ${price.toLocaleString('en-MY')}`;
  };

  const handleWhatsAppClick = (phone: string, propertyTitle?: string) => {
    const message = propertyTitle
      ? `Hi, I'm interested in ${propertyTitle}`
      : `Hi, I'd like to know more about your properties`;
    const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Mock testimonials - in a real app these would come from data
  const testimonials = [
    { name: 'Sarah Chen', rating: 5, text: 'Exceptional service! Found my dream home in just 2 weeks.', location: 'Kuala Lumpur' },
    { name: 'Ahmad Rahman', rating: 5, text: 'Professional, responsive, and truly cares about clients.', location: 'Penang' },
    { name: 'Michelle Tan', rating: 5, text: 'Best property agent I\'ve worked with. Highly recommended!', location: 'Johor Bahru' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Logo and Agent Name */}
            <div className="flex items-center gap-3">
              {agentInfo.logoUrl ? (
                <img
                  src={agentInfo.logoUrl}
                  alt={agentInfo.name}
                  className="h-12 w-auto object-contain"
                />
              ) : (
                <div
                  className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                  style={{ backgroundColor: branding.primaryColor }}
                >
                  {agentInfo.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h1 className="text-xl font-bold text-gray-900">{agentInfo.name}</h1>
                <p className="text-sm text-gray-600">Property Agent</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex items-center gap-4 flex-wrap">
              <a
                href={`tel:${agentInfo.phone}`}
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-teal-600 transition"
              >
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">{agentInfo.phone}</span>
              </a>
              <a
                href={`mailto:${agentInfo.email}`}
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-teal-600 transition"
              >
                <Mail className="h-4 w-4" />
                <span className="hidden sm:inline">{agentInfo.email}</span>
              </a>
              <button
                onClick={() => handleWhatsAppClick(agentInfo.whatsapp)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition hover:opacity-90"
                style={{ backgroundColor: branding.primaryColor }}
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Enhanced */}
      <section
        className="relative py-24 md:py-32 text-white overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${branding.secondaryColor} 0%, ${branding.primaryColor} 100%)`,
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* New: Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-fade-in">
              <Award className="h-4 w-4" />
              <span className="text-sm font-medium">Trusted by 500+ Happy Clients</span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">{pageTitle}</h2>
            <p className="text-xl md:text-2xl mb-4 opacity-95">
              Your Trusted Property Expert - {agentInfo.name}
            </p>
            <p className="text-lg mb-10 opacity-90 max-w-2xl mx-auto">
              Helping you find your dream property with personalized service and expert local knowledge
            </p>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-3xl mx-auto">
              <div className="bg-white/15 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/20 hover:bg-white/20 transition">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Building className="h-5 w-5" />
                  <p className="text-3xl font-bold">{properties.length}+</p>
                </div>
                <p className="text-sm opacity-90">Properties</p>
              </div>
              <div className="bg-white/15 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/20 hover:bg-white/20 transition">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Users className="h-5 w-5" />
                  <p className="text-3xl font-bold">500+</p>
                </div>
                <p className="text-sm opacity-90">Happy Clients</p>
              </div>
              <div className="bg-white/15 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/20 hover:bg-white/20 transition">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <TrendingUp className="h-5 w-5" />
                  <p className="text-3xl font-bold">10+</p>
                </div>
                <p className="text-sm opacity-90">Years Experience</p>
              </div>
              <div className="bg-white/15 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/20 hover:bg-white/20 transition">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Star className="h-5 w-5 fill-current" />
                  <p className="text-3xl font-bold">4.9</p>
                </div>
                <p className="text-sm opacity-90">Rating</p>
              </div>
            </div>

            {/* Primary CTA */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <button
                onClick={() => {
                  const propertiesSection = document.getElementById('properties');
                  propertiesSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-white text-gray-900 rounded-lg font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                View Properties
              </button>
              <button
                onClick={() => handleWhatsAppClick(agentInfo.whatsapp)}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white rounded-lg font-bold text-lg hover:bg-white hover:text-gray-900 transition-all"
              >
                <MessageCircle className="inline h-5 w-5 mr-2" />
                Contact Me
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Search/Filter Bar */}
      <section className="bg-gray-50 py-6 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">
                {properties.length} Properties Found
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Property Grid */}
      <section id="properties" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked premium properties matching your lifestyle and budget
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property, index) => (
              <div
                key={property.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1"
              >
                {/* Property Image */}
                <div className="relative h-72 bg-gray-200 overflow-hidden group">
                  {property.photos[0] ? (
                    <img
                      src={property.photos[0]}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading={index < 3 ? 'eager' : 'lazy'}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                      <Building className="h-16 w-16 text-gray-400" />
                    </div>
                  )}

                  {/* Featured Badge */}
                  {index === 0 && (
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-yellow-400 text-gray-900 font-bold text-xs flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      Featured
                    </div>
                  )}

                  {/* Price Tag */}
                  <div
                    className="absolute bottom-4 right-4 px-4 py-2 rounded-lg text-white font-bold text-lg backdrop-blur-sm"
                    style={{ backgroundColor: `${branding.primaryColor}ee` }}
                  >
                    {formatPrice(property.price)}
                  </div>

                  {/* Virtual Tour Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 flex items-center gap-1">
                    <Play className="h-3 w-3" />
                    Virtual Tour
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-500 mb-2">
                    <MapPin className="h-4 w-4" style={{ color: branding.primaryColor }} />
                    <span className="text-sm font-medium">{property.location}</span>
                  </div>

                  <h4 className="text-xl font-bold text-gray-900 mb-3 line-clamp-1">
                    {property.title}
                  </h4>

                  {/* Property Stats */}
                  <div className="flex items-center gap-5 mb-4 text-gray-700">
                    <div className="flex items-center gap-2">
                      <Bed className="h-5 w-5" style={{ color: branding.primaryColor }} />
                      <span className="font-medium">{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="h-5 w-5" style={{ color: branding.primaryColor }} />
                      <span className="font-medium">{property.bathrooms}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Maximize className="h-5 w-5" style={{ color: branding.primaryColor }} />
                      <span className="font-medium">{property.sqft} sqft</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-5 line-clamp-2 leading-relaxed">
                    {property.description}
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleWhatsAppClick(property.contactInfo.whatsapp, property.title)}
                      className="flex-1 py-3 px-4 rounded-lg text-white font-semibold transition-all hover:shadow-lg transform hover:scale-105"
                      style={{ backgroundColor: branding.primaryColor }}
                    >
                      Inquire Now
                    </button>
                    <button
                      className="px-4 py-3 rounded-lg border-2 transition-all hover:bg-gray-50"
                      style={{ borderColor: branding.primaryColor, color: branding.primaryColor }}
                    >
                      <Phone className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - NEW */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full mb-4">
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <span className="text-sm font-semibold text-gray-900">5.0 Rating</span>
            </div>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from happy homeowners
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100"
              >
                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                {/* Client Info */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: branding.primaryColor }}
                  >
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 mx-auto mb-3" style={{ color: branding.primaryColor }} />
              <p className="text-sm font-semibold text-gray-900">Verified Reviews</p>
            </div>
            <div className="text-center">
              <Award className="h-12 w-12 mx-auto mb-3" style={{ color: branding.primaryColor }} />
              <p className="text-sm font-semibold text-gray-900">Award Winning</p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 mx-auto mb-3" style={{ color: branding.primaryColor }} />
              <p className="text-sm font-semibold text-gray-900">500+ Clients</p>
            </div>
            <div className="text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-3" style={{ color: branding.primaryColor }} />
              <p className="text-sm font-semibold text-gray-900">10+ Years</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Ready to Find Your Dream Home?</h3>
            <p className="text-xl text-gray-600">
              Get personalized property recommendations. Quick response guaranteed.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-gray-100">
            {/* Simplified Form - Best Practice: Fewer Fields = Higher Conversion */}
            <form className="space-y-5" id="contact-form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:border-transparent transition-all text-lg"
                    style={{ focusRing: branding.primaryColor }}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:border-transparent transition-all text-lg"
                    placeholder="+60 12-345 6789"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:border-transparent transition-all text-lg"
                  placeholder="john@example.com"
                />
              </div>

              {/* Optional: Property Interest - Collapsed by default */}
              <div>
                <label htmlFor="property-interest" className="block text-sm font-semibold text-gray-700 mb-2">
                  Interested Property (Optional)
                </label>
                <select
                  id="property-interest"
                  name="propertyInterest"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:border-transparent transition-all text-lg bg-white"
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
                className="w-full py-5 px-6 rounded-xl text-white font-bold text-lg transition-all hover:shadow-2xl transform hover:scale-[1.02] flex items-center justify-center gap-2"
                style={{ backgroundColor: branding.primaryColor }}
              >
                <MessageCircle className="h-5 w-5" />
                Get Free Consultation
              </button>

              <p className="text-xs text-center text-gray-500 mt-4">
                <CheckCircle className="inline h-3 w-3 mr-1" />
                Your information is secure. We respond within 1 hour.
              </p>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600 mb-4">Prefer to chat directly?</p>
              <div className="flex items-center justify-center gap-4">
                <a
                  href={`tel:${agentInfo.phone}`}
                  className="flex items-center gap-2 text-gray-700 hover:text-teal-600 transition"
                >
                  <Phone className="h-5 w-5" />
                  <span>{agentInfo.phone}</span>
                </a>
                <button
                  onClick={() => handleWhatsAppClick(agentInfo.whatsapp)}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>WhatsApp Me</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-sm opacity-75">
              © {new Date().getFullYear()} {agentInfo.name}. All rights reserved.
            </p>
            <p className="text-xs opacity-60 mt-2">
              Trusted by 100+ clients | Professional Property Services
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
