import React from 'react';
import { LandingPage } from '@/lib/types';
import { Building, Bed, Bath, Maximize, Phone, Mail, MessageCircle, MapPin, Award, Star, Shield } from 'lucide-react';

interface TemplateBProps {
  data: LandingPage;
}

export default function TemplateB({ data }: TemplateBProps) {
  const { agentInfo, branding, properties, pageTitle } = data;

  const formatPrice = (price: number) => {
    return `RM ${price.toLocaleString('en-MY')}`;
  };

  const handleWhatsAppClick = (phone: string, propertyTitle?: string) => {
    const message = propertyTitle
      ? `Hi, I'm interested in ${propertyTitle}`
      : `Hi, I'd like to know more about your exclusive properties`;
    const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
      {/* Full-Width Hero */}
      <section
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: properties[0]?.photos[0]
            ? `url(${properties[0].photos[0]})`
            : 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-slate-950/75"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          {agentInfo.logoUrl && (
            <img
              src={agentInfo.logoUrl}
              alt={agentInfo.name}
              className="h-20 w-auto object-contain mx-auto mb-8"
            />
          )}

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            {pageTitle}
          </h1>

          <p className="text-2xl md:text-3xl mb-4" style={{ fontFamily: 'Georgia, serif', color: branding.primaryColor }}>
            {agentInfo.name}
          </p>

          <p className="text-xl md:text-2xl mb-12 opacity-90">
            Your Trusted Property Expert
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="#properties"
              className="px-8 py-4 rounded-lg font-semibold text-slate-950 transition hover:opacity-90 text-lg"
              style={{ backgroundColor: branding.primaryColor }}
            >
              View Exclusive Listings
            </a>
            <button
              onClick={() => handleWhatsAppClick(agentInfo.whatsapp)}
              className="px-8 py-4 rounded-lg border-2 font-semibold text-white transition hover:bg-white hover:text-slate-950 text-lg"
              style={{ borderColor: branding.primaryColor }}
            >
              Contact Me
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Concierge Section */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose {agentInfo.name}?</h2>
            <div className="w-24 h-1 mx-auto" style={{ backgroundColor: branding.primaryColor }}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8 rounded-xl bg-slate-800/50 backdrop-blur">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: branding.primaryColor }}>
                <Award className="h-8 w-8 text-slate-950" />
              </div>
              <h3 className="text-xl font-bold mb-3">Local Expertise</h3>
              <p className="text-gray-300 leading-relaxed">
                Deep knowledge of the area's best properties and neighborhoods
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-slate-800/50 backdrop-blur">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: branding.primaryColor }}>
                <Star className="h-8 w-8 text-slate-950" />
              </div>
              <h3 className="text-xl font-bold mb-3">VIP Service</h3>
              <p className="text-gray-300 leading-relaxed">
                Personalized attention and exclusive access to premium listings
              </p>
            </div>

            <div className="text-center p-8 rounded-xl bg-slate-800/50 backdrop-blur">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: branding.primaryColor }}>
                <Shield className="h-8 w-8 text-slate-950" />
              </div>
              <h3 className="text-xl font-bold mb-3">Exclusive Access</h3>
              <p className="text-gray-300 leading-relaxed">
                First look at off-market properties and pre-launch developments
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section id="properties" className="py-20 bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Exclusive Listings</h2>
            <p className="text-xl text-gray-300">Handpicked premium properties just for you</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {properties.map((property, index) => (
              <div
                key={property.id}
                className="bg-slate-900 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-slate-800"
              >
                {/* Large Property Image */}
                <div className="relative h-96 bg-slate-800 overflow-hidden group">
                  {property.photos[0] ? (
                    <img
                      src={property.photos[0]}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-800">
                      <Building className="h-24 w-24 text-slate-600" />
                    </div>
                  )}

                  {/* Exclusive Badge */}
                  {index === 0 && (
                    <div className="absolute top-6 left-6 px-4 py-2 rounded-full text-slate-950 font-bold text-sm" style={{ backgroundColor: branding.primaryColor }}>
                      Featured
                    </div>
                  )}

                  {/* Price Tag */}
                  <div className="absolute bottom-6 right-6 px-6 py-3 rounded-lg bg-slate-950/90 backdrop-blur">
                    <p className="text-2xl font-bold" style={{ color: branding.primaryColor }}>
                      {formatPrice(property.price)}
                    </p>
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-8">
                  <div className="flex items-center gap-2 text-gray-400 mb-3">
                    <MapPin className="h-4 w-4" style={{ color: branding.primaryColor }} />
                    <span className="text-sm">{property.location}</span>
                  </div>

                  <h3 className="text-2xl font-bold mb-4">{property.title}</h3>

                  <div className="flex items-center gap-6 mb-6 text-gray-300">
                    <div className="flex items-center gap-2">
                      <Bed className="h-5 w-5" />
                      <span>{property.bedrooms} Beds</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="h-5 w-5" />
                      <span>{property.bathrooms} Baths</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Maximize className="h-5 w-5" />
                      <span>{property.sqft} sqft</span>
                    </div>
                  </div>

                  <p className="text-gray-300 leading-relaxed mb-6 line-clamp-3">
                    {property.description}
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleWhatsAppClick(property.contactInfo.whatsapp, property.title)}
                      className="flex-1 py-3 px-6 rounded-lg font-semibold transition hover:opacity-90"
                      style={{ backgroundColor: branding.primaryColor, color: '#0f172a' }}
                    >
                      Schedule Viewing
                    </button>
                    <a
                      href={`tel:${property.contactInfo.phone}`}
                      className="py-3 px-6 rounded-lg border-2 font-semibold transition hover:bg-white hover:text-slate-950"
                      style={{ borderColor: branding.primaryColor }}
                    >
                      <Phone className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Schedule a Private Viewing</h2>
            <p className="text-xl text-gray-300">Experience luxury living firsthand</p>
          </div>

          <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 md:p-12 border border-slate-700">
            <form className="space-y-6" id="contact-form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold mb-2" style={{ color: branding.primaryColor }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-600 rounded-lg focus:ring-2 focus:border-transparent text-white"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold mb-2" style={{ color: branding.primaryColor }}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-600 rounded-lg focus:ring-2 focus:border-transparent text-white"
                    placeholder="+60123456789"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: branding.primaryColor }}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-600 rounded-lg focus:ring-2 focus:border-transparent text-white"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="property-interest" className="block text-sm font-semibold mb-2" style={{ color: branding.primaryColor }}>
                  Property Interest
                </label>
                <select
                  id="property-interest"
                  name="propertyInterest"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-600 rounded-lg focus:ring-2 focus:border-transparent text-white"
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
                <label htmlFor="message" className="block text-sm font-semibold mb-2" style={{ color: branding.primaryColor }}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-600 rounded-lg focus:ring-2 focus:border-transparent text-white"
                  placeholder="Tell me about your requirements..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-8 rounded-lg font-bold text-lg text-slate-950 transition hover:opacity-90"
                style={{ backgroundColor: branding.primaryColor }}
              >
                Request Private Viewing
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-xl font-semibold mb-2">{agentInfo.name}</p>
            <div className="flex items-center justify-center gap-6 mb-6">
              <a href={`tel:${agentInfo.phone}`} className="text-gray-400 hover:text-white transition">
                {agentInfo.phone}
              </a>
              <span className="text-gray-600">|</span>
              <a href={`mailto:${agentInfo.email}`} className="text-gray-400 hover:text-white transition">
                {agentInfo.email}
              </a>
            </div>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} {agentInfo.name}. Luxury Property Services.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
