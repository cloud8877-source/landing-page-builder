import React from 'react';
import { LandingPage } from '@/lib/types';
import { Building, Bed, Bath, Maximize, Phone, Mail, MessageCircle, MapPin } from 'lucide-react';

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

      {/* Hero Section */}
      <section
        className="py-16 text-white"
        style={{
          background: `linear-gradient(135deg, ${branding.secondaryColor} 0%, ${branding.primaryColor} 100%)`,
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{pageTitle}</h2>
          <p className="text-xl mb-8 opacity-90">
            Your Trusted Property Expert - {agentInfo.name}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg">
              <p className="text-2xl font-bold">{properties.length}</p>
              <p className="text-sm opacity-80">Properties Available</p>
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
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Featured Properties
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200"
              >
                {/* Property Image */}
                <div className="relative h-64 bg-gray-200 overflow-hidden group">
                  {property.photos[0] ? (
                    <img
                      src={property.photos[0]}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-300">
                      <Building className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                  <div
                    className="absolute top-4 right-4 px-3 py-1 rounded-full text-white font-bold text-sm"
                    style={{ backgroundColor: branding.primaryColor }}
                  >
                    {formatPrice(property.price)}
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-5">
                  <h4 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                    {property.title}
                  </h4>

                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <MapPin className="h-4 w-4" style={{ color: branding.primaryColor }} />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  {/* Property Stats */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-700">
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4" />
                      <span>{property.bedrooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="h-4 w-4" />
                      <span>{property.bathrooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Maximize className="h-4 w-4" />
                      <span>{property.sqft} sqft</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {property.description}
                  </p>

                  {/* View Details Button */}
                  <button
                    onClick={() => handleWhatsAppClick(property.contactInfo.whatsapp, property.title)}
                    className="w-full py-2 px-4 rounded-lg text-white font-medium transition hover:opacity-90"
                    style={{ backgroundColor: branding.secondaryColor }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h3>
            <p className="text-lg text-gray-600">
              Interested in any property? Contact me for more information or to schedule a viewing.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <form className="space-y-6" id="contact-form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="+60123456789"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="property-interest" className="block text-sm font-medium text-gray-700 mb-2">
                  Property Interest
                </label>
                <select
                  id="property-interest"
                  name="propertyInterest"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Select a property</option>
                  {properties.map((property) => (
                    <option key={property.id} value={property.id}>
                      {property.title} - {formatPrice(property.price)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="Tell me about your requirements..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-lg text-white font-bold text-lg transition hover:opacity-90"
                style={{ backgroundColor: branding.primaryColor }}
              >
                Send Message
              </button>
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
